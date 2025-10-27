"use client";
import React, { useEffect, useState } from "react";

interface TypeAnimationProps {
  text: string;
  speed?: number;
}

const TypeAnimation: React.FC<TypeAnimationProps> = ({ text, speed = 63 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mistakeMade, setMistakeMade] = useState(false);
  const mistakeChar = "n";

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < text.length) {
          if (charIndex === 2 && !mistakeMade) {
            setDisplayedText((prev) => prev + mistakeChar);
            setCharIndex((prev) => prev + 1);
            setMistakeMade(true);
            setTimeout(() => setIsDeleting(true), 500);
          } else if (!mistakeMade) {
            setDisplayedText((prev) => prev + text[charIndex]);
            setCharIndex((prev) => prev + 1);
          }
        } else {
          clearInterval(typingInterval);
        }
      } else {
        if (displayedText.endsWith(mistakeChar)) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setTimeout(() => {
            setMistakeMade(false);
            setIsDeleting(false);
            setDisplayedText((prev) => prev + text[charIndex - 1]);
          }, speed + 200);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, speed);
    return () => clearInterval(typingInterval);
  }, [text, speed, charIndex, isDeleting, mistakeMade, displayedText]);

  return (
    <span>
      {displayedText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypeAnimation;
