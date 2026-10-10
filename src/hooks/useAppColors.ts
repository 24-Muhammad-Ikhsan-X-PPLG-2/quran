import { useColorScheme } from "react-native";
import { Colors } from "../constants/Color";

export const useAppColors = () => {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? Colors.dark : Colors.light;
};
