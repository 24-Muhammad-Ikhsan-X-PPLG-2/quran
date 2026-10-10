import { Stack } from "expo-router";
import { Colors } from "../constants/Color";
import { KeyboardAvoidingView, Text, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppToastHost } from "../components/app-toast";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Poppins_Regular: Poppins_400Regular,
    Poppins_Bold: Poppins_700Bold,
  });
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background);
  }, [theme]);
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView
          style={{ flex: 1, backgroundColor: theme.background }}
          edges={["top"]}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="search/index" />
            <Stack.Screen name="surat/[id]" />
          </Stack>
        </SafeAreaView>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <AppToastHost />
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  );
}
