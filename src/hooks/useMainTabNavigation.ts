import { createContext, useContext } from "react";

export const MainTabNavigationContext = createContext<(index: number) => void>(
  () => {},
);

export const useMainTabNavigation = () => useContext(MainTabNavigationContext);
