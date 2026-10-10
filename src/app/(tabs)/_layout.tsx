import { useState } from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TabBar, TabView, type Route } from "react-native-tab-view";
import { useAppColors } from "@/src/hooks/useAppColors";
import Home from "../pages/home";
import AsmaulHusna from "../pages/asmaul-husna";
import { MainTabNavigationContext } from "@/src/hooks/useMainTabNavigation";

type MainTabRoute = Route & {
  title: string;
  focusedIcon: "home" | "spa";
  unfocusedIcon: "home-outline" | "spa-outline";
};

const routes: MainTabRoute[] = [
  {
    key: "home",
    title: "Home",
    focusedIcon: "home",
    unfocusedIcon: "home-outline",
  },
  {
    key: "AsmaulHusna",
    title: "Asmaul Husna",
    focusedIcon: "spa",
    unfocusedIcon: "spa-outline",
  },
];

export default function TabLayout() {
  const colors = useAppColors();
  const [index, setIndex] = useState(0);

  return (
    <MainTabNavigationContext.Provider value={setIndex}>
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={({ route }) => {
          if (route.key === "home") return <Home />;
          return <AsmaulHusna />;
        }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            activeColor={colors.primary}
            inactiveColor={colors.onSurfaceVariant}
            pressColor={colors.primaryContainer}
            renderIndicator={() => null}
            options={{
              home: {
                label: ({ color }) => (
                  <Text
                    style={{
                      color,
                      textAlign: "center",
                      fontFamily: "Poppins_Bold",
                      includeFontPadding: false,
                      fontSize: 12,
                    }}
                  >
                    Home
                  </Text>
                ),
                icon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? "home" : "home-outline"}
                    size={size}
                    color={color}
                  />
                ),
              },
              AsmaulHusna: {
                label: ({ color }) => (
                  <Text
                    style={{
                      color,
                      textAlign: "center",
                      fontFamily: "Poppins_Bold",
                      includeFontPadding: false,
                      fontSize: 12,
                    }}
                  >
                    Asmaul Husna
                  </Text>
                ),
                icon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? "spa" : "spa-outline"}
                    size={size}
                    color={color}
                  />
                ),
              },
            }}
            tabStyle={{
              height: 68,
              justifyContent: "center",
            }}
            style={{
              backgroundColor: colors.elevation.level2,
              borderTopWidth: 1,
              borderTopColor: colors.outlineVariant,
              elevation: 0,
              paddingBottom: 20,
            }}
          />
        )}
        lazy
        swipeEnabled
        tabBarPosition="bottom"
        style={{ backgroundColor: colors.background }}
      />
    </MainTabNavigationContext.Provider>
  );
}
