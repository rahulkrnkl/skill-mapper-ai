declare module "next-themes" {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    themes?: string[];
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>;
} 