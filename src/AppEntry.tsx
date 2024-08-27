import { ThemeProvider, TodoProvider } from "./context";
import { RootNavigation } from "./navigation";

export function AppEntry() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <RootNavigation />
      </TodoProvider>
    </ThemeProvider>
  );
}
