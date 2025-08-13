
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

function ThemeBodyClassUpdater() {
  const { theme } = useTheme();

  React.useEffect(() => {
    // Clear all theme classes
    document.body.classList.remove('light', 'dark', 'gradient', 'custom');

    // Add the current theme class
    if (theme) {
       if (theme === 'gradient' || theme === 'custom') {
         document.body.classList.add(theme);
       }
       // 'light', 'dark' and 'system' are handled by next-themes automatically by setting class on <html>
       // but we will also add it to body for our gradient logic to work
    }
  }, [theme]);
  
   React.useEffect(() => {
    const isGradient = document.body.classList.contains('gradient');
    const isCustom = document.body.classList.contains('custom');
    
    if (theme === 'gradient' && !isGradient) {
      document.body.classList.add('gradient');
    } else if (theme !== 'gradient' && isGradient) {
      document.body.classList.remove('gradient');
    }

    if (theme === 'custom' && !isCustom) {
      document.body.classList.add('custom');
    } else if (theme !== 'custom' && isCustom) {
      document.body.classList.remove('custom');
    }

  }, [theme]);


  return null;
}


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeBodyClassUpdater />
      {children}
    </NextThemesProvider>
  )
}
