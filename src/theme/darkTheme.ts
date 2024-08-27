import { spacings } from "./spacings";

export const darkTheme: AppTheme = {
  isLight: false,
  background: {
    color: "#121212",
    onColor: "#fefefe",
  },
  card: {
    color: "#2a2a2a",
    onColor: "#fefefe",
  },
  primary: {
    color: "#9474b3",
    onColor: "#fefefe",
  },
  input: {
    color: "#2a2a2a",
    onColor: "#fefefe",
  },
  error: "#CF6679",
  ...spacings,
};
