type Spacings = {
  screenPadding: number;
  baseline: number;
};

type AppThemeColor = {
  color: string;
  onColor: string;
};

type AppTheme = {
  background: AppThemeColor;
  card: AppThemeColor;
  primary: AppThemeColor;
} & Spacings;
