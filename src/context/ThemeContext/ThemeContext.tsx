import { PropsWithChildren, createContext, useState } from "react";
import { darkTheme, lightTheme } from "../../theme";

type ThemeVariant = "dark" | "light";

type ThemeContextValue = {
  theme: AppTheme;
  setTheme: (variant: ThemeVariant) => void;
};

export const ThemeContext = createContext<ThemeContextValue>(undefined!);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<AppTheme>(lightTheme);

  function setThemeVariant(variant: ThemeVariant) {
    if (variant === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeVariant,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
