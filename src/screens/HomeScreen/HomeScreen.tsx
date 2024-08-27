import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Button } from "../../components";
import { useTheme } from "../../context";
import { NavigationScreenProps } from "../../navigation/types";

export function HomeScreen() {
  const navigation = useNavigation<NavigationScreenProps<"Home">>();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  function onPressAddTask() {
    navigation.navigate("AddTask");
  }

  return (
    <View style={styles.container}>
      <Button onPress={onPressAddTask} title="Add task" />
    </View>
  );
}

function getStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      padding: theme.screenPadding,
      backgroundColor: theme.background.color,
    },
  });
}
