import { ThemeProvider } from "./context";
import { RootNavigation } from "./navigation";

export function AppEntry() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
