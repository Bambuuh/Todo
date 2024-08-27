import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "../../context";

type InputProps = TextInputProps;

export function Input({ style, ...props }: InputProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.container, style]}>
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

function getStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.input.color,
      height: theme.baseline * 5,
      borderRadius: 12,
    },
    input: {
      height: theme.baseline * 5,
      paddingHorizontal: theme.screenPadding,
    },
  });
}
