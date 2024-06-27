'use client';
import React, { useEffect, useState } from 'react';

interface TypeAnimationProps {
  sequence: (string | number)[];
  speed?: number;
  repeat?: number;
}

const TypeAnimation: React.FC<TypeAnimationProps> = ({
  sequence,
  speed = 63,
  repeat = Infinity
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [seqIndex, setSeqIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const current = sequence[seqIndex];
      const isString = typeof current === 'string';
      if (isString) {
        if (!isDeleting && charIndex < (current as string).length) {
          setDisplayedText((prev) => prev + (current as string)[charIndex]);
          setCharIndex(charIndex + 1);
        } else if (isDeleting && charIndex > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        } else if (!isDeleting && charIndex === (current as string).length) {
          if (
            sequence.length === 1 ||
            (repeat !== Infinity && repeatCount >= repeat)
          ) {
            return;
          }
          setIsDeleting(true);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setSeqIndex((seqIndex + 1) % sequence.length);
          if ((seqIndex + 1) % sequence.length === 0) {
            setRepeatCount(repeatCount + 1);
          }
        }
      } else {
        setTimeout(() => {
          setSeqIndex((seqIndex + 1) % sequence.length);
        }, current as number);
      }
    };

    const timeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, seqIndex, isDeleting, speed, sequence, repeat, repeatCount]);

  return (
    <span>
      {displayedText}
      <span className='animate-blink'>|</span>
    </span>
  );
};

export default TypeAnimation;
