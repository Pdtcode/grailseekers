'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { InstagramIcon } from '@/components/icons';
import { IconSvgProps } from '@/types';

export default function ThemeInstagram({ size = 24, ...props }: IconSvgProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    // During SSR and initial client render, return null
    return null;
  }
  
  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const isDarkMode = currentTheme === 'dark';
  
  // Custom styles for the icon based on theme
  const svgStyle = {
    filter: isDarkMode ? 'invert(1)' : 'none',
    transition: 'filter 0.3s ease'
  };
  
  return (
    <span style={svgStyle}>
      <InstagramIcon size={size} {...props} />
    </span>
  );
}