declare module "next-themes" {
  import * as React from "react"

  export interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    themes?: string[];
    forcedTheme?: string;
    storageKey?: string;
  }

  export const ThemeProvider: React.ComponentType<ThemeProviderProps>;
  export const useTheme: () => {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    resolvedTheme: string | undefined;
  };
} 