import { useNavigation } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, TaskItem, ToggleButton } from "../../components";
import { TaskCategory, useTheme, useTodo } from "../../context";
import { NavigationScreenProps } from "../../navigation/types";

type Collection = "all" | "active" | "completed";

type DisplayCategory = TaskCategory | "all";

export function HomeScreen() {
  const navigation = useNavigation<NavigationScreenProps<"Home">>();
  const { theme, setTheme } = useTheme();
  const styles = getStyles(theme);
  const { tasks, completeTask, deleteTask } = useTodo();
  const [taskCollection, setTaskCollection] = useState<Collection>("active");
  const [taskCategory, setTaskCategory] = useState<DisplayCategory>("all");
  const [isEdit, setIsEdit] = useState(false);

  const taskItems = useMemo(() => {
    let collection = tasks.all;
    if (taskCollection === "active") {
      collection = tasks.active;
    }

    if (taskCollection === "completed") {
      collection = tasks.completed;
    }

    const keys = Object.keys(collection);

    const filtered =
      taskCategory === "all"
        ? keys
        : keys.filter((key) => collection[+key].category === taskCategory);

    return filtered.map((key, index) => {
      const task = collection[+key];
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
  }, [taskCollection, tasks, isEdit, taskCategory]);

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

  return (
    <View style={styles.container}>
      <Button
        style={styles.addTaskButton}
        onPress={onPressAddTask}
        title="Add task"
      />
      <View style={styles.filterRow}>
        <ToggleButton<DisplayCategory>
          title="All"
          onPress={setTaskCategory}
          value="all"
          active={taskCategory === "all"}
        />
        <ToggleButton<DisplayCategory>
          style={styles.toggleButton}
          title="Personal"
          onPress={setTaskCategory}
          value="personal"
          active={taskCategory === "personal"}
        />
        <ToggleButton<DisplayCategory>
          style={styles.toggleButton}
          title="Work"
          onPress={setTaskCategory}
          value="work"
          active={taskCategory === "work"}
        />
      </View>
      <View style={styles.filterRow}>
        <ToggleButton<Collection>
          title="Active"
          onPress={setTaskCollection}
          value="active"
          active={taskCollection === "active"}
        />
        <ToggleButton<Collection>
          style={styles.toggleButton}
          title="Completed"
          onPress={setTaskCollection}
          value="completed"
          active={taskCollection === "completed"}
        />
        <ToggleButton<Collection>
          style={styles.toggleButton}
          title="All"
          onPress={setTaskCollection}
          value="all"
          active={taskCollection === "all"}
        />
      </View>
      <Text style={styles.title}>Active</Text>
      {taskItems}
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
