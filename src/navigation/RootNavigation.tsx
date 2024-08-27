import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../context";
import { AddTaskScreen, HomeScreen } from "../screens";
import { NavigationParamsList } from "./types";

const Stack = createNativeStackNavigator<NavigationParamsList>();

export function RootNavigation() {
  const { theme } = useTheme();
  return (
    <NavigationContainer
      theme={{
        dark: !theme.isLight,
        colors: {
          background: theme.background.color,
          border: theme.background.color,
          card: theme.card.color,
          notification: theme.primary.color,
          primary: theme.primary.color,
          text: theme.background.onColor,
        },
      }}
    >
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: "Add task", presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
