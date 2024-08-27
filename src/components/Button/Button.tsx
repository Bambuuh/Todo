import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../../context";

type ButtonProps = {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  onPress: () => void;
};

export function Button({
  title,
  style,
  disabled = false,
  onPress,
}: ButtonProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

function getStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      height: theme.baseline * 5,
      borderRadius: 8,
      backgroundColor: theme.primary.color,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: theme.primary.onColor,
      fontSize: 16,
    },
  });
}
