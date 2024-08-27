import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context";

type ToggleButtonProps<T> = {
  title: string;
  active: boolean;
  value: T;
  style?: ViewStyle;
  onPress: (value: T) => void;
};

export function ToggleButton<T>({
  title,
  active,
  style,
  value,
  onPress,
}: ToggleButtonProps<T>) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const backgroundColor = active ? theme.primary.color : theme.card.color;
  const color = active ? theme.primary.onColor : theme.card.onColor;

  const containerStyle: ViewStyle = {
    backgroundColor,
  };

  const textStyle: TextStyle = {
    color,
  };

  function onPressButton() {
    onPress(value);
  }

  return (
    <>
      <TouchableOpacity
        onPress={onPressButton}
        style={[style, styles.container, containerStyle]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </>
  );
}

function getStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      paddingHorizontal: theme.baseline * 2,
      paddingVertical: theme.baseline,
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 4,
      flexDirection: "row",
    },
    text: {},
  });
}
