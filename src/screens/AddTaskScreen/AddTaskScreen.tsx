import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, Input, ToggleButton } from "../../components";
import { TaskCategory, useTheme, useTodo } from "../../context";
import { NavigationScreenProps } from "../../navigation/types";

export function AddTaskScreen() {
  const navigation = useNavigation<NavigationScreenProps<"AddTask">>();
  const { addTask } = useTodo();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>("personal");

  function onPressAdd() {
    addTask({
      title,
      category,
    });
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onPressCancel}>
          <Text style={styles.headerRight}>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  function onPressCancel() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Input
        autoFocus
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <View style={styles.categoryContainer}>
        <ToggleButton<TaskCategory>
          style={styles.categoryOne}
          title="Personal"
          active={category === "personal"}
          onPress={setCategory}
          value="personal"
        />
        <ToggleButton<TaskCategory>
          title="Work"
          active={category === "work"}
          onPress={setCategory}
          value="work"
        />
      </View>
      <Button disabled={title.length === 0} title="Add" onPress={onPressAdd} />
    </View>
  );
}

function getStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.screenPadding,
      backgroundColor: theme.background.color,
    },
    input: {
      marginBottom: theme.baseline * 2,
    },
    headerRight: {
      color: theme.primary.color,
    },
    categoryContainer: {
      flexDirection: "row",
      marginBottom: theme.screenPadding,
    },
    categoryOne: {
      marginRight: theme.baseline,
    },
  });
}
