import { spacings } from "./spacings";

export const lightTheme: AppTheme = {
  isLight: true,
  background: {
    color: "#f2f6fa",
    onColor: "#434343",
  },
  card: {
    color: "#ffffff",
    onColor: "#0f1109",
  },
  primary: {
    color: "#6c62ff",
    onColor: "#fcfbff",
  },
  input: {
    color: "#FFFFFF",
    onColor: "#0f1109",
  },
  error: "#fd385b",
  ...spacings,
};
