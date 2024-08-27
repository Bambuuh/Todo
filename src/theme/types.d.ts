type Spacings = {
  screenPadding: number;
  baseline: number;
};

type AppThemeColor = {
  color: string;
  onColor: string;
};

type AppTheme = {
  isLight: boolean;
  background: AppThemeColor;
  card: AppThemeColor;
  primary: AppThemeColor;
  input: AppThemeColor;
  error: string;
} & Spacings;
