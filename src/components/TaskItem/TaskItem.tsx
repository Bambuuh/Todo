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

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPressTask} style={[styles.itemContainer]}>
        <Text style={styles.text}>{task.title}</Text>
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
      height: theme.baseline * 7,
      justifyContent: "center",
      paddingHorizontal: theme.screenPadding,
    },
    text: {
      fontSize: 16,
      fontWeight: "500",
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
  });
}
