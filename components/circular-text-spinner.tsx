'use client';

import { useEffect, useState } from 'react';
import { fontUDMincho } from '@/config/fonts';

interface CircularTextSpinnerProps {
  text?: string;
  size?: number;
  animationDuration?: number;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
}

const CircularTextSpinner = ({
  text = 'お前はもう死んでいる',
  size = 300,
  animationDuration = 10,
  backgroundColor = 'rgba(0, 0, 0, 0.9)',
  textColor = 'white',
  fontFamily = fontUDMincho.style.fontFamily,
}: CircularTextSpinnerProps) => {
  const [mounted, setMounted] = useState(false);
  
  // Only render on client-side to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate positions for each character around the circle
  const renderCircularText = () => {
    const characters = text.split('');
    const angleStep = 360 / characters.length;
    
    return characters.map((char, index) => {
      const angle = index * angleStep;
      
      return (
        <div
          key={index}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: `0 ${size / 2}px`,
            transform: `rotate(${angle}deg) translateY(-${size / 2 - 30}px)`,
            fontFamily: fontFamily,
            color: textColor,
            fontSize: '1.8rem',
            fontWeight: 'normal',
            letterSpacing: '0.05em',
            textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          {char}
        </div>
      );
    });
  };

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Inner circle with pulse effect */}
      <div 
        className="absolute rounded-full animate-pulse"
        style={{
          width: `${size * 0.3}px`,
          height: `${size * 0.3}px`,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      
      {/* Spinning text circle */}
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animation: `spin ${animationDuration}s linear infinite`,
        }}
      >
        {renderCircularText()}
      </div>
      
    </div>
  );
};

export default CircularTextSpinner;