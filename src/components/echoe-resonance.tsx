"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "./ui/Button";
import Shadow from "./ui/Shadow";

/**
 * Echo Resonance Game Component
 *
 * A rhythm-based fragment collection game inspired by Wuthering Waves.
 * Players use arrow keys or WASD to move and collect fragments in rhythm.
 *
 * Features:
 * - Canvas-based 2D game rendering
 * - Rhythm mechanics with BPM-based timing
 * - Responsive canvas sizing based on container
 * - Fragment generation with proper spacing
 * - Wuthering Waves themed completion messages
 *
 * Controls:
 * - Arrow keys or WASD for movement
 * - R key to reset game
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/** Component props interface */
interface EchoResonanceProps {
  fragmentCount?: number; // Number of fragments to collect (default: 6)
  bpm?: number; // Beats per minute for rhythm timing (default: 80)
  onComplete?: () => void; // Callback when all fragments are collected
}

/** 2D position coordinates */
interface Position {
  x: number;
  y: number;
}

/** Player character state */
interface Player extends Position {
  speed: number; // Movement speed multiplier
}

/** Collectible fragment object */
interface Fragment extends Position {
  r: number; // Radius size
  picked: boolean; // Whether fragment has been collected
  wobble: number; // Animation phase for floating effect
}

/** Keyboard input state */
interface Keys {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}

/** Rhythm metronome timing */
interface Metronome {
  lastBeat: number; // Timestamp of last beat
  period: number; // Milliseconds between beats
}

/** Complete game state */
interface GameState {
  player: Player; // Player character
  fragments: Fragment[]; // Array of collectible fragments
  keys: Keys; // Current keyboard input state
  lastTick: number; // Last frame timestamp
  beatWindow: number; // Rhythm timing window
  bpm: number; // Beats per minute
  metronome: Metronome; // Rhythm timing system
  _justBeat?: boolean; // Internal beat flag for rendering
}

// ============================================================================
// GAME CONSTANTS
// ============================================================================

/** Game configuration constants */
const GAME_CONSTANTS = {
  // Player settings
  PLAYER_START_X: 120, // Initial X position
  PLAYER_SPEED: 2.6, // Base movement speed
  PLAYER_RADIUS: 18, // Player hitbox radius
  PLAYER_CORE_RADIUS: 8, // Inner core radius for visual effect

  // Fragment settings
  FRAGMENT_MIN_RADIUS_PERCENT: 0.025, // 2.5% of canvas width
  FRAGMENT_MAX_RADIUS_PERCENT: 0.035, // 3.5% of canvas width
  COLLISION_DISTANCE: 24, // Collision detection distance

  // Rhythm system
  BEAT_WINDOW_MULTIPLIER: 0.18, // Beat window as percentage of beat period
  MIN_BEAT_WINDOW: 80, // Minimum beat window in milliseconds

  // Resonance system
  RESONANCE_BOOST: 0.12, // Resonance gain per fragment
  RESONANCE_DECAY: 0.002, // Resonance decay rate
  RESONANCE_INCREASE: 0.01, // Resonance increase per beat

  // Movement modifiers
  MOVEMENT_BOOST: 1.6, // Speed boost when moving to rhythm
  NORMAL_MOVEMENT: 1.0, // Normal movement speed multiplier

  // Animation settings
  PULSE_AMPLITUDE: 0.12, // Player pulse animation amplitude
  PULSE_FREQUENCY: 150, // Player pulse animation frequency
  WOBBLE_SPEED: 0.005, // Fragment floating animation speed
  WOBBLE_AMPLITUDE: 0.12, // Fragment floating animation amplitude
} as const;

// ============================================================================
// ABSORB TOOLTIP COMPONENT
// ============================================================================

interface AbsorbTooltipProps {
  position: Position;
  isAbsorbing: boolean;
  absorbProgress: number;
  onStartAbsorption: () => void;
}

const AbsorbTooltip: React.FC<AbsorbTooltipProps> = ({
  position,
  isAbsorbing,
  absorbProgress,
  onStartAbsorption,
}) => {
  return (
    <div
      className="absolute z-10 select-none"
      style={{
        left: position.x - 40, // offset to center tooltip
        top: position.y - 60, // position above fragment
      }}
    >
      <div className="bg-[#0b1620]/90 border border-divider rounded-md px-2 py-1 shadow-lg text-[11px] text-secondary-dark whitespace-nowrap">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStartAbsorption}
            disabled={isAbsorbing}
            className="px-2 py-1 rounded bg-aquamarine/90 text-[#0b1620] disabled:opacity-60 hover:bg-aquamarine transition-colors"
          >
            Absorb
          </button>
          <span className="opacity-80">or press</span>
          <kbd className="px-1 py-[1px] rounded border border-divider text-secondary">
            F
          </kbd>
        </div>
        {isAbsorbing && (
          <div className="mt-2 w-32 h-1.5 bg-divider rounded overflow-hidden">
            <div
              className="h-1.5 bg-aquamarine rounded transition-all duration-100"
              style={{
                width: `${Math.round(absorbProgress * 100)}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function EchoResonance({
  fragmentCount = 6,
  bpm = 80,
  onComplete = () => {},
}: EchoResonanceProps) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  /** Responsive canvas dimensions based on parent container */
  const [responsiveWidth, setResponsiveWidth] = useState(400);
  const [responsiveHeight, setResponsiveHeight] = useState(370);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update dimensions based on parent container size
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        // Use full container width minus padding (40px total)
        const newWidth = containerWidth;
        // Set height as 60% of width for good aspect ratio
        // const newHeight = newWidth * 0.9;

        setResponsiveWidth(newWidth);
        // setResponsiveHeight(newHeight);
      }
    };

    // const debouncedUpdate = () => {
    //   clearTimeout(timeoutId);
    //   timeoutId = setTimeout(updateDimensions, 100);
    // };

    updateDimensions();

    // // Use ResizeObserver to watch for container size changes
    // const resizeObserver = new ResizeObserver(debouncedUpdate);
    // if (containerRef.current) {
    //   resizeObserver.observe(containerRef.current);
    // }

    // Also listen to window resize as fallback
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  /** Canvas and animation references */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  /** Game state */
  const [running, setRunning] = useState<boolean>(true);
  const [completed, setCompleted] = useState<boolean>(false);
  const [resonance, setResonance] = useState<number>(0);
  const [collected, setCollected] = useState<number>(0);
  const [nearbyIndex, setNearbyIndex] = useState<number | null>(null);
  const [isAbsorbing, setIsAbsorbing] = useState<boolean>(false);
  const [absorbTargetIndex, setAbsorbTargetIndex] = useState<number | null>(
    null
  );
  const [absorbProgress, setAbsorbProgress] = useState<number>(0);
  const [tooltipPosition, setTooltipPosition] = useState<Position | null>(null);
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [gameStartTime, setGameStartTime] = useState<number>(0);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  /** Generate random number between two values */
  const randBetween = useCallback(
    (a: number, b: number): number => a + Math.random() * (b - a),
    []
  );

  /** Calculate distance between two points */
  const dist = useCallback(
    (a: Position, b: Position): number => Math.hypot(a.x - b.x, a.y - b.y),
    []
  );

  // ============================================================================
  // GAME STATE INITIALIZATION
  // ============================================================================

  /** Main game state reference */
  const stateRef = useRef<GameState>({
    player: {
      x: GAME_CONSTANTS.PLAYER_START_X,
      y: 200,
      speed: GAME_CONSTANTS.PLAYER_SPEED,
    },
    fragments: [],
    keys: { left: false, right: false, up: false, down: false },
    lastTick: performance.now(),
    beatWindow: 180, // ms window for rhythm success (calculated later)
    bpm: bpm,
    metronome: { lastBeat: performance.now(), period: 60000 / bpm },
  });

  // Absorption tuning
  const ABSORB_RANGE_PERCENT = 0.06; // as fraction of canvas width
  const ABSORB_DURATION_MS = 1200; // time required to absorb

  // ============================================================================
  // FRAGMENT GENERATION SYSTEM
  // ============================================================================

  /** Check if a position is valid (not too close to other fragments or player) */
  const isValidPosition = useCallback(
    (
      x: number,
      y: number,
      fragments: Fragment[],
      player: Player,
      minDistance: number
    ): boolean => {
      // Check distance from player
      if (dist({ x, y }, player) < minDistance) {
        return false;
      }

      // Check distance from other fragments
      for (const fragment of fragments) {
        if (dist({ x, y }, fragment) < minDistance) {
          return false;
        }
      }

      return true;
    },
    [dist]
  );

  /** Generate fragments with proper spacing to prevent clustering */
  const generateFragments = useCallback(
    (count: number, canvasWidth: number, canvasHeight: number): Fragment[] => {
      const fragments: Fragment[] = [];
      const minRadius =
        canvasWidth * GAME_CONSTANTS.FRAGMENT_MIN_RADIUS_PERCENT;
      const maxRadius =
        canvasWidth * GAME_CONSTANTS.FRAGMENT_MAX_RADIUS_PERCENT;
      const minDistance = canvasWidth * 0.15; // 15% of canvas width minimum distance
      const maxAttempts = 100; // Prevent infinite loops

      const player = {
        x: GAME_CONSTANTS.PLAYER_START_X,
        y: 200,
        speed: GAME_CONSTANTS.PLAYER_SPEED,
      };

      for (let i = 0; i < count; i++) {
        let attempts = 0;
        let validPosition = false;
        let x = 0;
        let y = 0;

        // Try to find a valid position
        while (!validPosition && attempts < maxAttempts) {
          x = randBetween(canvasWidth * 0.2, canvasWidth - 100);
          y = randBetween(60, canvasHeight - 60);

          if (isValidPosition(x, y, fragments, player, minDistance)) {
            validPosition = true;
          }
          attempts++;
        }

        // If we couldn't find a valid position, use the last attempt
        fragments.push({
          x,
          y,
          r: randBetween(minRadius, maxRadius),
          picked: false,
          wobble: Math.random() * Math.PI * 2,
        });
      }

      return fragments;
    },
    [randBetween, isValidPosition]
  );

  // ============================================================================
  // GAME CONTROL FUNCTIONS
  // ============================================================================

  /** Reset the game to initial state */
  const resetGame = useCallback(() => {
    setCompleted(false);
    setRunning(true);
    setResonance(0);
    setCollected(0);
    setNearbyIndex(null);
    setIsAbsorbing(false);
    setAbsorbTargetIndex(null);
    setAbsorbProgress(0);
    setTooltipPosition(null);
    setCompletionTime(0);
    setGameStartTime(performance.now());

    // Reset game state
    const s = stateRef.current;
    s.player = {
      x: GAME_CONSTANTS.PLAYER_START_X,
      y: 200,
      speed: GAME_CONSTANTS.PLAYER_SPEED,
    };
    s.keys = { up: false, down: false, left: false, right: false };
    s.lastTick = 0;
    s.beatWindow = 0;
    s.bpm = bpm;
    s.metronome = { lastBeat: 0, period: 0 };
    s._justBeat = false;

    // Reinitialize fragments with proper spacing
    s.fragments = generateFragments(
      fragmentCount,
      responsiveWidth,
      responsiveHeight
    );

    // Recalculate beat window
    s.metronome.period = 60000 / s.bpm;
    s.beatWindow = Math.max(
      GAME_CONSTANTS.MIN_BEAT_WINDOW,
      s.metronome.period * GAME_CONSTANTS.BEAT_WINDOW_MULTIPLIER
    );
  }, [
    bpm,
    fragmentCount,
    responsiveHeight,
    responsiveWidth,
    generateFragments,
  ]);

  // ============================================================================
  // GAME INITIALIZATION
  // ============================================================================

  /** Initialize fragments when component mounts or dependencies change */
  useEffect(() => {
    const s = stateRef.current;
    s.fragments = generateFragments(
      fragmentCount,
      responsiveWidth,
      responsiveHeight
    );

    // calculate beat window from bpm
    s.metronome.period = 60000 / s.bpm;
    s.beatWindow = Math.max(
      GAME_CONSTANTS.MIN_BEAT_WINDOW,
      s.metronome.period * GAME_CONSTANTS.BEAT_WINDOW_MULTIPLIER
    );

    // Set initial game start time
    setGameStartTime(performance.now());
  }, [
    fragmentCount,
    bpm,
    responsiveHeight,
    responsiveWidth,
    generateFragments,
  ]);

  // ============================================================================
  // INPUT HANDLING
  // ============================================================================

  /** Handle keyboard input for player movement */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      const keys = stateRef.current.keys;
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
      if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
      if (e.key === "ArrowUp" || e.key === "w") keys.up = true;
      if (e.key === "ArrowDown" || e.key === "s") keys.down = true;
      if (e.key === "f" || e.key === "F") {
        // start absorption via keyboard if eligible
        if (!isAbsorbing && nearbyIndex !== null) {
          startAbsorption(nearbyIndex);
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent): void => {
      const keys = stateRef.current.keys;
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
      if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
      if (e.key === "ArrowUp" || e.key === "w") keys.up = false;
      if (e.key === "ArrowDown" || e.key === "s") keys.down = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [nearbyIndex, isAbsorbing]);

  /** Start absorption process for the specified fragment */
  const startAbsorption = useCallback((index: number): void => {
    const s = stateRef.current;
    const fragment = s.fragments[index];

    // Validate fragment exists and is not already picked
    if (!fragment || fragment.picked) return;

    setAbsorbTargetIndex(index);
    setIsAbsorbing(true);
    setAbsorbProgress(0);

    // TODO: Play absorption start sound effect
    // const audio = new Audio('/sounds/absorb-start.mp3');
    // audio.volume = 0.7;
    // audio.play().catch(console.warn);
  }, []);

  /** Cancel the current absorption process */
  const cancelAbsorption = useCallback((): void => {
    if (!isAbsorbing) return;

    setIsAbsorbing(false);
    setAbsorbTargetIndex(null);
    setAbsorbProgress(0);

    // TODO: Stop/fade absorption loop sound effect
    // if (absorptionAudioRef.current) {
    //   absorptionAudioRef.current.pause();
    //   absorptionAudioRef.current.currentTime = 0;
    // }
  }, [isAbsorbing]);

  // ============================================================================
  // GAME LOOP
  // ============================================================================

  /** Main game loop with animation frame updates */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function step(now: number): void {
      const s = stateRef.current;
      const dt = Math.min(40, now - s.lastTick);
      s.lastTick = now;
      const canvasWidth = responsiveWidth;
      const canvasHeight = responsiveHeight;

      // Update metronome
      if (now - s.metronome.lastBeat >= s.metronome.period) {
        s.metronome.lastBeat += s.metronome.period;
        // visual beat pulse can be used in rendering
        s._justBeat = true;
      } else {
        s._justBeat = false;
      }

      // Movement - rhythm mechanic: prefer movement aligned with beat
      const move: Position = { x: 0, y: 0 };
      if (s.keys.left) move.x -= 1;
      if (s.keys.right) move.x += 1;
      if (s.keys.up) move.y -= 1;
      if (s.keys.down) move.y += 1;

      // If there's input and it's near the beat, boost speed and reward
      const timeToBeat = Math.abs(
        (now - s.metronome.lastBeat) % s.metronome.period
      );
      const beatNear =
        timeToBeat < s.beatWindow ||
        Math.abs(timeToBeat - s.metronome.period) < s.beatWindow;

      if ((move.x !== 0 || move.y !== 0) && beatNear) {
        // rhythm success — small boost
        s.player.x += move.x * s.player.speed * GAME_CONSTANTS.MOVEMENT_BOOST;
        s.player.y += move.y * s.player.speed * GAME_CONSTANTS.MOVEMENT_BOOST;
        // small visual resonance increase
        setResonance((r) => Math.min(1, r + GAME_CONSTANTS.RESONANCE_INCREASE));
      } else {
        s.player.x += move.x * s.player.speed * GAME_CONSTANTS.NORMAL_MOVEMENT;
        s.player.y += move.y * s.player.speed * GAME_CONSTANTS.NORMAL_MOVEMENT;
        // slight decay
        setResonance((r) => Math.max(0, r - GAME_CONSTANTS.RESONANCE_DECAY));
      }

      // keep player in bounds
      s.player.x = Math.max(
        GAME_CONSTANTS.PLAYER_RADIUS,
        Math.min(canvasWidth - GAME_CONSTANTS.PLAYER_RADIUS, s.player.x)
      );
      s.player.y = Math.max(
        GAME_CONSTANTS.PLAYER_RADIUS,
        Math.min(canvasHeight - GAME_CONSTANTS.PLAYER_RADIUS, s.player.y)
      );

      // Update fragments
      s.fragments.forEach((f) => {
        f.wobble += dt * GAME_CONSTANTS.WOBBLE_SPEED;
        f.y += Math.sin(f.wobble) * GAME_CONSTANTS.WOBBLE_AMPLITUDE;
      });

      // Proximity detection (do not auto-pick). Identify nearest fragment in range
      const proximityRange = responsiveWidth * ABSORB_RANGE_PERCENT;
      let nearestIdx: number | null = null;
      let nearestDist = Infinity;
      s.fragments.forEach((f, idx) => {
        if (f.picked) return;
        const d = dist(s.player, f);
        if (d <= f.r + proximityRange && d < nearestDist) {
          nearestDist = d;
          nearestIdx = idx;
        }
      });

      // Update nearby index and capture initial position when entering range
      if (nearestIdx !== nearbyIndex) {
        setNearbyIndex(nearestIdx);
        if (nearestIdx !== null) {
          // Capture the initial position (without wobble) for stable tooltip positioning
          const fragment = s.fragments[nearestIdx];
          setTooltipPosition({ x: fragment.x, y: fragment.y });
        } else {
          setTooltipPosition(null);
        }
      }

      // Handle absorption progress if active
      if (isAbsorbing && absorbTargetIndex !== null) {
        const target = s.fragments[absorbTargetIndex];
        if (!target || target.picked) {
          cancelAbsorption();
        } else {
          const d = dist(s.player, target);
          if (d > target.r + proximityRange) {
            // moved away — cancel
            cancelAbsorption();
          } else {
            // within range — progress
            setAbsorbProgress((p) => Math.min(1, p + dt / ABSORB_DURATION_MS));
            if (absorbProgress + dt / ABSORB_DURATION_MS >= 1) {
              // Absorption complete — collect fragment
              target.picked = true;
              setCollected((c) => c + 1);
              setResonance((r) =>
                Math.min(1, r + GAME_CONSTANTS.RESONANCE_BOOST)
              );
              setIsAbsorbing(false);
              setAbsorbTargetIndex(null);
              setAbsorbProgress(0);

              // TODO: Play absorption complete sound effect
              // const audio = new Audio('/sounds/absorb-complete.mp3');
              // audio.volume = 0.8;
              // audio.play().catch(console.warn);
            }
          }
        }
      }

      // If all fragments collected — trigger completion
      if (s.fragments.every((f) => f.picked)) {
        // Complete
        setCompleted(true);
        setRunning(false);
        setCompletionTime(performance.now());
        onComplete();
      }

      // Render
      if (ctx) {
        render(ctx, now);
      }

      if (running && rafRef.current !== null) {
        rafRef.current = requestAnimationFrame(step);
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [running, resonance, onComplete, responsiveWidth, responsiveHeight, dist]);

  // ============================================================================
  // RENDERING SYSTEM
  // ============================================================================

  /** Main render function that draws all game elements */
  const render = useCallback(
    (ctx: CanvasRenderingContext2D, now: number): void => {
      const s = stateRef.current;
      const canvasWidth = responsiveWidth;
      const canvasHeight = responsiveHeight;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Background - theme gradient
      const g = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
      g.addColorStop(0, "#011221"); // primary
      g.addColorStop(1, "#010c15"); // background
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // subtle vignette
      ctx.fillStyle = "rgba(1, 8, 14, 0.3)"; // primary-dark with opacity
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw fragments
      s.fragments.forEach((f) => {
        if (f.picked) return;
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 3);
        grad.addColorStop(0, "rgba(67, 217, 173, 0.98)"); // aquamarine
        grad.addColorStop(0.5, "rgba(60, 157, 147, 0.45)"); // secondary-light
        grad.addColorStop(1, "rgba(1, 18, 33, 0)"); // primary-light
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // inner crystal
        ctx.fillStyle = "rgba(67, 217, 173, 0.95)"; // aquamarine
        ctx.beginPath();
        ctx.moveTo(f.x - f.r, f.y);
        ctx.lineTo(f.x, f.y - f.r);
        ctx.lineTo(f.x + f.r, f.y);
        ctx.lineTo(f.x, f.y + f.r);
        ctx.closePath();
        ctx.fill();
      });

      // Draw player orb with enhanced visibility
      const p = s.player;
      const pulse =
        1 +
        GAME_CONSTANTS.PULSE_AMPLITUDE *
          Math.sin(now / GAME_CONSTANTS.PULSE_FREQUENCY);

      // Outer glow ring
      // ctx.beginPath();
      // ctx.arc(
      //   p.x,
      //   p.y,
      //   GAME_CONSTANTS.PLAYER_RADIUS * pulse * 1.3,
      //   0,
      //   Math.PI * 2
      // );
      // ctx.strokeStyle = `rgba(67, 217, 173, ${0.6 + 0.3 * pulse})`; // aquamarine
      // ctx.lineWidth = 3;
      // ctx.stroke();

      // Main player gradient
      const playerGrad = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        GAME_CONSTANTS.PLAYER_RADIUS * pulse
      );
      playerGrad.addColorStop(0, "rgba(67, 217, 173, 1)"); // aquamarine - bright center
      playerGrad.addColorStop(0.3, "rgba(67, 217, 173, 0.8)"); // aquamarine
      playerGrad.addColorStop(0.7, "rgba(1, 18, 33, 0.9)"); // primary-light
      playerGrad.addColorStop(1, "rgba(1, 12, 21, 0.3)"); // background
      ctx.fillStyle = playerGrad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, GAME_CONSTANTS.PLAYER_RADIUS * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright core
      ctx.beginPath();
      ctx.arc(p.x, p.y, GAME_CONSTANTS.PLAYER_CORE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(67, 217, 173, ${0.9 + 0.1 * pulse})`; // aquamarine - very bright
      ctx.fill();

      // Center dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(67, 217, 173, 1)"; // aquamarine - solid bright
      ctx.fill();

      // If completed: enhanced completion UI
      if (completed) {
        const timeSinceCompletion = now - completionTime;
        const animationProgress = Math.min(1, timeSinceCompletion / 1200); // 1.2s total animation

        // Background overlay with fade-in
        const overlayAlpha = Math.min(0.7, animationProgress * 0.7);
        ctx.fillStyle = `rgba(1, 8, 14, ${overlayAlpha})`;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Enhanced animated ripples (4 ripples with shimmer)
        const rippleCount = 4;
        const maxRippleRadius = 250; // Fixed for larger screens
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        for (let i = 0; i < rippleCount; i++) {
          const rippleProgress = Math.max(
            0,
            (timeSinceCompletion - i * 150) / 1200
          );
          const rippleAlpha = Math.max(0, 1 - rippleProgress);
          const rippleRadius = 60 + i * 45 + rippleProgress * 120;

          // Add shimmer effect
          const shimmer = Math.sin(now * 0.003 + i) * 0.1 + 1;
          const shimmerAlpha = rippleAlpha * shimmer;

          if (rippleRadius < maxRippleRadius) {
            // Add glow effect to ripples
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(67, 217, 173, ${shimmerAlpha * 0.3})`;
            ctx.strokeStyle = `rgba(67, 217, 173, ${
              shimmerAlpha * (0.7 - i * 0.12)
            })`;
            ctx.lineWidth = 2.5 - i * 0.3; // Thinner, more elegant strokes
            ctx.beginPath();
            ctx.arc(centerX, centerY, rippleRadius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset shadow
          }
        }

        // Enhanced floating particles with varied sizes and glow
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
          const particleProgress = Math.max(
            0,
            (timeSinceCompletion - 300) / 800
          );
          const particleAlpha = Math.max(0, 1 - particleProgress);
          const angle = (i / particleCount) * Math.PI * 2 + now * 0.001;
          const distance = 100 + Math.sin(now * 0.002 + i) * 30;
          const particleX = centerX + Math.cos(angle) * distance;
          const particleY = centerY + Math.sin(angle) * distance;

          // Varied particle sizes
          const sizeType = i % 3;
          const particleSize = sizeType === 0 ? 1.5 : sizeType === 1 ? 2 : 2.5;

          // Add glow effect
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(67, 217, 173, ${particleAlpha * 0.4})`;
          ctx.fillStyle = `rgba(67, 217, 173, ${particleAlpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }

        // Card background with fade-in
        const cardProgress = Math.max(0, (timeSinceCompletion - 300) / 300);
        const cardAlpha = Math.min(1, cardProgress);

        if (cardAlpha > 0) {
          const cardWidth = 550; // Slightly larger
          const cardHeight = 220; // Slightly larger
          const cardX = centerX - cardWidth / 2;
          const cardY = centerY - cardHeight / 2;

          // Card background with enhanced gradient
          const cardGrad = ctx.createLinearGradient(
            cardX,
            cardY,
            cardX,
            cardY + cardHeight
          );
          cardGrad.addColorStop(0, `rgba(11, 22, 32, ${cardAlpha * 0.98})`);
          cardGrad.addColorStop(0.5, `rgba(8, 18, 28, ${cardAlpha * 0.96})`);
          cardGrad.addColorStop(1, `rgba(1, 12, 21, ${cardAlpha * 0.95})`);

          ctx.fillStyle = cardGrad;

          // Add glow to card border
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(67, 217, 173, ${cardAlpha * 0.2})`;
          ctx.strokeStyle = `rgba(67, 217, 173, ${cardAlpha * 0.5})`;
          ctx.lineWidth = 2;

          // Rounded rectangle
          const radius = 12;
          ctx.beginPath();
          ctx.moveTo(cardX + radius, cardY);
          ctx.lineTo(cardX + cardWidth - radius, cardY);
          ctx.arcTo(
            cardX + cardWidth,
            cardY,
            cardX + cardWidth,
            cardY + radius,
            radius
          );
          ctx.lineTo(cardX + cardWidth, cardY + cardHeight - radius);
          ctx.arcTo(
            cardX + cardWidth,
            cardY + cardHeight,
            cardX + cardWidth - radius,
            cardY + cardHeight,
            radius
          );
          ctx.lineTo(cardX + radius, cardY + cardHeight);
          ctx.arcTo(
            cardX,
            cardY + cardHeight,
            cardX,
            cardY + cardHeight - radius,
            radius
          );
          ctx.lineTo(cardX, cardY + radius);
          ctx.arcTo(cardX, cardY, cardX + radius, cardY, radius);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.shadowBlur = 0; // Reset shadow

          // Enhanced success icon with 3 rotating rings
          const iconProgress = Math.max(0, (timeSinceCompletion - 600) / 300);
          const iconAlpha = Math.min(1, iconProgress);
          const iconPulse = 1 + Math.sin(now * 0.005) * 0.1;

          if (iconAlpha > 0) {
            // Add glow to icon
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(67, 217, 173, ${iconAlpha * 0.4})`;

            // 3 rotating rings (like echo waves)
            for (let ring = 0; ring < 3; ring++) {
              const ringRadius = 15 + ring * 8;
              const rotationSpeed = 0.002 + ring * 0.001;
              const rotation = now * rotationSpeed;
              const ringAlpha = iconAlpha * (0.8 - ring * 0.2);

              ctx.strokeStyle = `rgba(67, 217, 173, ${ringAlpha})`;
              ctx.lineWidth = 2.5 - ring * 0.5;
              ctx.beginPath();
              ctx.arc(
                centerX,
                centerY - 40,
                ringRadius * iconPulse,
                0,
                Math.PI * 2
              );
              ctx.stroke();
            }

            // Inner circle
            ctx.fillStyle = `rgba(67, 217, 173, ${iconAlpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(centerX, centerY - 40, 8 * iconPulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0; // Reset shadow
          }

          // Text with slide-in animation
          const textProgress = Math.max(0, (timeSinceCompletion - 600) / 300);
          const textAlpha = Math.min(1, textProgress);
          const textOffset = (1 - textProgress) * 20;

          if (textAlpha > 0) {
            // Main heading with glow effect
            ctx.font = "32px ui-rounded, system-ui, sans-serif";
            ctx.textAlign = "center";

            // Add glow to heading
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(67, 217, 173, ${textAlpha * 0.3})`;
            ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha * 1.0})`;
            ctx.fillText(
              "Frequency Stabilized!",
              centerX,
              centerY + textOffset
            );
            ctx.shadowBlur = 0; // Reset shadow

            // Subtitle
            ctx.font = "18px ui-monospace, monospace";
            ctx.fillStyle = `rgba(67, 217, 173, ${textAlpha * 1.0})`;
            ctx.fillText(
              "Echo absorption complete...",
              centerX,
              centerY + 35 + textOffset
            );

            // Stats
            const statsProgress = Math.max(
              0,
              (timeSinceCompletion - 900) / 300
            );
            const statsAlpha = Math.min(1, statsProgress);

            if (statsAlpha > 0) {
              const gameTime = Math.floor(
                (completionTime - gameStartTime) / 1000
              );
              const minutes = Math.floor(gameTime / 60);
              const seconds = gameTime % 60;
              const timeString = `${minutes}:${seconds
                .toString()
                .padStart(2, "0")}`;
              const resonancePercent = Math.round(resonance * 100);

              // Enhanced stats with symbols and better formatting
              ctx.font = "16px ui-monospace, monospace";
              ctx.fillStyle = `rgba(200, 220, 230, ${statsAlpha * 0.9})`;

              // Fragments stat
              ctx.fillText(
                `◆ ${collected}/${s.fragments.length} Fragments`,
                centerX,
                centerY + 70 + textOffset
              );

              // Resonance stat
              ctx.fillText(
                `◆ ${resonancePercent}% Resonance`,
                centerX,
                centerY + 95 + textOffset
              );

              // Time stat
              ctx.fillText(
                `◆ Time: ${timeString}`,
                centerX,
                centerY + 120 + textOffset
              );

              // Instructions
              ctx.font = "14px ui-monospace, monospace";
              ctx.fillStyle = `rgba(160, 180, 190, ${statsAlpha * 0.7})`;
              ctx.fillText(
                "Press R to restart",
                centerX,
                centerY + 150 + textOffset
              );
            }
          }
        }
      }
    },
    [
      responsiveWidth,
      responsiveHeight,
      resonance,
      collected,
      completed,
      completionTime,
      gameStartTime,
    ]
  );

  /** Helper function to draw rounded rectangles */
  const roundRect = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fill: boolean = true,
      stroke: boolean = false
    ): void => {
      const radius = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    },
    []
  );

  // ============================================================================
  // COMPONENT RENDER
  // ============================================================================

  return (
    <div className="xl:w-[80%] ml-auto relative">
      <Shadow color="primary" top={-100} left={-40} className="w-full h-full" />
      <Shadow
        color="secondary2"
        bottom={-290}
        right={-150}
        className="w-full h-full"
      />
      <div className="bg-(image:--gradient-teal) rounded-2xl p-3 md:p-7  border border-divider relative overflow-hidden ">
        {/* Background glow effects */}
        <div className="flex flex-col gap-4">
          {/* Game Canvas - Top */}
          <div ref={containerRef} className="w-full grow flex justify-center">
            <div className="relative" ref={canvasWrapperRef}>
              <canvas
                ref={canvasRef}
                width={responsiveWidth}
                height={responsiveHeight}
                className="rounded-lg border border-divider shadow-inner w-full max-w-full"
                style={{ display: "block" }}
              />
              {/* Absorb tooltip overlay */}
              {nearbyIndex !== null && !completed && tooltipPosition && (
                <AbsorbTooltip
                  position={tooltipPosition}
                  isAbsorbing={isAbsorbing && absorbTargetIndex === nearbyIndex}
                  absorbProgress={absorbProgress}
                  onStartAbsorption={() => startAbsorption(nearbyIndex!)}
                />
              )}
            </div>
          </div>

          {/* Controls Panel - Bottom */}
          <div className="w-full text-secondary-dark text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Instructions Section */}
              <div className="space-y-3">
                <div className="text-aquamarine font-medium">How to play</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-aquamarine">//</span>
                    <span>use arrow keys</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-aquamarine">//</span>
                    <span>or WASD to play</span>
                  </div>
                </div>
              </div>

              {/* Fragments Left Indicator */}
              <div className="space-y-3">
                <div className="text-aquamarine text-xs">// fragments left</div>
                <div className="grid grid-cols-6 gap-1">
                  {Array.from({ length: fragmentCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < collected
                          ? "bg-aquamarine shadow-lg shadow-aquamarine/50"
                          : "bg-divider"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[11px] text-secondary-dark">
                  Fragments collected: {collected}/{fragmentCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
