import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, TaskItem, ToggleButton } from "../../components";
import {
  Task,
  TaskCategory,
  TaskCollection,
  useTheme,
  useTodo,
} from "../../context";
import { NavigationScreenProps } from "../../navigation/types";

type Collection = keyof TaskCollection;

type DisplayCategory = TaskCategory | "all";

export function HomeScreen() {
  const navigation = useNavigation<NavigationScreenProps<"Home">>();
  const { theme, setTheme } = useTheme();
  const styles = getStyles(theme);
  const { tasks, completeTask, deleteTask } = useTodo();
  const [taskCollection, setTaskCollection] = useState<Collection>("active");
  const [taskCategory, setTaskCategory] = useState<DisplayCategory>("all");
  const [isEdit, setIsEdit] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const taskItems = useMemo<Task[]>(() => {
    let collection = tasks[taskCollection];
    const keys = Object.keys(collection);
    return (
      taskCategory === "all"
        ? keys
        : keys.filter((key) => collection[+key].category === taskCategory)
    ).map((key) => collection[+key]);
  }, [taskCollection, tasks, taskCategory]);

  const onPressToggleTheme = useCallback(() => {
    setTheme(theme.isLight ? "dark" : "light");
  }, [theme, setTheme]);

  const onPressEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit, setIsEdit]);

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
  }, [isEdit, onPressToggleTheme, onPressEdit]);

  function onPressAddTask() {
    navigation.navigate("AddTask");
  }

  const renderItem = useCallback(
    ({ item, index }: { item: Task; index: number }) => {
      return (
        <TaskItem
          edit={isEdit}
          onPress={completeTask}
          onPressDelete={deleteTask}
          key={item.id}
          style={{ marginTop: index === 0 ? 0 : theme.baseline }}
          task={item}
        />
      );
    },
    [isEdit, completeTask, deleteTask]
  );

  const contentContainerStyle: ViewStyle = {
    padding: theme.screenPadding,
    paddingBottom: bottom + theme.screenPadding,
  };

  return (
    <View style={styles.container}>
      <StatusBar style={theme.isLight ? "dark" : "light"} />
      <View style={styles.topContainer}>
        <Button
          style={styles.addTaskButton}
          onPress={onPressAddTask}
          title="Add task"
        />
        <View style={[styles.filterRow, { marginBottom: theme.screenPadding }]}>
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
      </View>
      <FlatList<Task>
        data={taskItems}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={contentContainerStyle}
      />
    </View>
  );
}

function getStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background.color,
    },
    topContainer: {
      padding: theme.screenPadding,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "lightgrey",
    },
    bottomContainer: {
      padding: theme.screenPadding,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "lightgrey",
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
    },
    toggleButton: {
      marginLeft: theme.baseline,
    },
  });
}
