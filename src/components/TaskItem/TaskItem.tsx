import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Task, useTheme } from "../../context";

type TaskItemProps = {
  task: Task;
  style?: ViewStyle;
  edit: boolean;
  onPress: (task: Task) => void;
  onPressDelete: (task: Task) => void;
};

export function TaskItem({
  task,
  style,
  edit,
  onPress,
  onPressDelete,
}: TaskItemProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  function onPressTask() {
    onPress(task);
  }

  function onPressDeleteTask() {
    onPressDelete(task);
  }

  function getPrettyCategory() {
    return task.category.charAt(0).toUpperCase() + task.category.slice(1);
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPressTask} style={[styles.itemContainer]}>
        <View>
          <Text style={styles.text}>{task.title}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{getPrettyCategory()}</Text>
          </View>
        </View>
        <View
          style={[
            styles.doneBox,
            {
              backgroundColor: task.completed
                ? "#66cf88"
                : theme.background.color,
            },
          ]}
        />
      </TouchableOpacity>
      {edit && (
        <TouchableOpacity
          style={styles.removeContainer}
          onPress={onPressDeleteTask}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function getStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    itemContainer: {
      flex: 1,
      backgroundColor: theme.card.color,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.screenPadding,
      flexDirection: "row",
    },
    text: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.card.onColor,
    },
    removeContainer: {
      marginLeft: theme.baseline,
      borderRadius: 12,
      height: theme.baseline * 7,
      width: theme.baseline * 7,
      backgroundColor: theme.error,
      alignItems: "center",
      justifyContent: "center",
    },
    deleteText: {
      fontSize: 16,
      fontWeight: "500",
      color: "white",
    },
    categoryContainer: {
      borderRadius: 8,
      backgroundColor: theme.background.color,
      padding: theme.baseline,
      marginTop: theme.baseline,
    },
    categoryText: {
      color: theme.background.onColor,
      fontSize: 12,
    },
    doneBox: {
      height: theme.baseline * 6,
      width: theme.baseline * 6,
      borderRadius: 4,
    },
  });
}
