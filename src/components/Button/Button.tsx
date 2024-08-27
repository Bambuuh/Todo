import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../context";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: ButtonProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
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
