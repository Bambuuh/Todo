import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TaskItem, ToggleButton } from "../../components";
import { useTheme, useTodo } from "../../context";
import { NavigationScreenProps } from "../../navigation/types";

type Collection = "all" | "active" | "completed";

export function HomeScreen() {
  const navigation = useNavigation<NavigationScreenProps<"Home">>();
  const { theme, setTheme } = useTheme();
  const styles = getStyles(theme);
  const { active, all, completed, completeTask, deleteTask } = useTodo();
  const [taskCollection, setTaskCollection] = useState<Collection>("active");
  const [isEdit, setIsEdit] = useState(false);

  const tasks = useMemo(() => {
    let tasksToRender = all;
    if (taskCollection === "active") {
      tasksToRender = active;
    }

    if (taskCollection === "completed") {
      tasksToRender = completed;
    }

    return Object.keys(tasksToRender).map((key, index) => {
      const task = tasksToRender[+key];
      return (
        <TaskItem
          edit={isEdit}
          onPress={completeTask}
          onPressDelete={deleteTask}
          key={task.id}
          style={{ marginTop: index === 0 ? 0 : theme.baseline }}
          task={task}
        />
      );
    });
  }, [taskCollection, active, completed, all, isEdit]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={onPressToggleTheme}>
          <Text style={styles.themeText}>Toggle theme</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={onPressEdit}>
          <Text style={styles.themeText}>{isEdit ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>
      ),
    });
  }, [isEdit]);

  function onPressToggleTheme() {
    setTheme(theme.isLight ? "dark" : "light");
  }

  function onPressEdit() {
    setIsEdit(!isEdit);
  }

  function onPressAddTask() {
    navigation.navigate("AddTask");
  }

  function onPressCollection(collection: Collection) {
    setTaskCollection(collection);
  }

  return (
    <View style={styles.container}>
      <Button
        style={styles.addTaskButton}
        onPress={onPressAddTask}
        title="Add task"
      />
      <View style={styles.filterRow}>
        <ToggleButton<Collection>
          title="Active"
          onPress={onPressCollection}
          value="active"
          active={taskCollection === "active"}
        />
        <ToggleButton<Collection>
          style={styles.toggleButton}
          title="Completed"
          onPress={onPressCollection}
          value="completed"
          active={taskCollection === "completed"}
        />
        <ToggleButton<Collection>
          style={styles.toggleButton}
          title="All"
          onPress={onPressCollection}
          value="all"
          active={taskCollection === "all"}
        />
      </View>
      <Text style={styles.title}>Active</Text>
      {tasks}
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
    themeText: {
      color: theme.primary.color,
    },
    addTaskButton: {
      marginBottom: theme.screenPadding,
    },
    title: {
      fontSize: 20,
      color: theme.background.onColor,
      fontWeight: "bold",
      marginBottom: theme.screenPadding,
    },
    filterRow: {
      flexDirection: "row",
      marginBottom: theme.screenPadding,
    },
    toggleButton: {
      marginLeft: theme.baseline,
    },
  });
}
