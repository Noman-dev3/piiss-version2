"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

function ThemeBodyClassUpdater() {
  const { theme } = useTheme();

  React.useEffect(() => {
    if (theme === 'gradient') {
      document.body.classList.add('gradient');
    } else {
      document.body.classList.remove('gradient');
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
