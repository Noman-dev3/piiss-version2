
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

function ThemeBodyClassUpdater() {
  const { theme } = useTheme();

  React.useEffect(() => {
    // Add the current theme class to the body
    document.body.classList.remove('light', 'dark', 'gradient', 'custom');
    if (theme) {
      document.body.classList.add(theme);
    }
  }, [theme]);
  
  return null;
}

// Helper to convert hex to HSL string components (e.g., "224 71.4% 4.1%")
function hexToHsl(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h} ${s}% ${l}%`;
}


function CustomThemeStyleUpdater() {
    const { theme } = useTheme();
    const [customColors, setCustomColors] = React.useState({
        primary: "#87ceeb",
        accent: "#ffdab9",
        background: "#e6e9ed",
    });

    React.useEffect(() => {
        const handleStorageChange = () => {
             const storedColors = localStorage.getItem('custom-theme-colors');
             if (storedColors) {
                 setCustomColors(JSON.parse(storedColors));
             }
        }
        window.addEventListener('storage', handleStorageChange);
        handleStorageChange(); // Initial load
        
        return () => window.removeEventListener('storage', handleStorageChange)
    }, []);

    React.useEffect(() => {
        if (theme === 'custom') {
            document.documentElement.style.setProperty('--custom-primary', hexToHsl(customColors.primary));
            document.documentElement.style.setProperty('--custom-accent', hexToHsl(customColors.accent));
            document.documentElement.style.setProperty('--custom-background', hexToHsl(customColors.background));
        }
    }, [theme, customColors]);

    return null;
}


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeBodyClassUpdater />
      <CustomThemeStyleUpdater />
      {children}
    </NextThemesProvider>
  )
}
