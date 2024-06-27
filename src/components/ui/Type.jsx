import React, { useState, useEffect } from 'react';

const Type = () => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const phrases = ['Hello, ', 'World!'];
  const typingSpeed = 100; // Adjust typing speed here

  useEffect(() => {
    let currentIndex = 0;
    let currentPhrase = '';
    let timeout;

    const typeNextCharacter = () => {
      if (currentIndex < phrases.length) {
        currentPhrase = phrases[currentIndex];
        setText(prevText => prevText + currentPhrase.charAt(prevText.length));
        if (text.length < currentPhrase.length) {
          timeout = setTimeout(typeNextCharacter, typingSpeed);
        } else {
          currentIndex++;
          setText('');
          timeout = setTimeout(typeNextCharacter, typingSpeed * 3); // Adjust delay between phrases here
        }
      } else {
        setIsVisible(false);
      }
    };

    typeNextCharacter();

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div>
      {isVisible && <span>{text}<span className="cursor">|</span></span>}
    </div>
  );
};

export default Type;
