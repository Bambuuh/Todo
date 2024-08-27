import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type NavigationParamsList = {
  Home: undefined;
  AddTask: undefined;
};

export type NavigationRouteProps<T extends keyof NavigationParamsList> =
  RouteProp<NavigationParamsList, T>;

export type NavigationScreenProps<T extends keyof NavigationParamsList> =
  NativeStackNavigationProp<NavigationParamsList, T>;
