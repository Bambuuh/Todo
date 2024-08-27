import { PropsWithChildren, createContext, useState } from "react";
import { darkTheme, lightTheme } from "../../theme";

type ThemeContextValue = {
  theme: AppTheme;
  setTheme: (variant: "dark" | "light") => void;
};

export const ThemeContext = createContext<ThemeContextValue>(undefined!);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<AppTheme>(lightTheme);

  function setThemeVariant(variant: "dark" | "light") {
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
