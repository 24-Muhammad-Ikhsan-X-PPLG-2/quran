import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppColors } from "../hooks/useAppColors";

type ToastType = "success" | "error" | "info";

type ToastOptions = {
  type?: ToastType;
  text1?: string;
  text2?: string;
  visibilityTime?: number;
};

type ToastMessage = ToastOptions & {
  id: number;
};

let nextToastId = 0;
let currentToast: ToastMessage | null = null;
const subscribers = new Set<(toast: ToastMessage | null) => void>();

function publishToast(toast: ToastMessage | null) {
  currentToast = toast;
  subscribers.forEach((subscriber) => subscriber(toast));
}

export const Toast = {
  show(options: ToastOptions) {
    publishToast({ ...options, id: ++nextToastId });
  },
  hide(id?: number) {
    if (id !== undefined && currentToast?.id !== id) return;
    publishToast(null);
  },
};

const toastStyles: Record<
  ToastType,
  {
    icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
    accent: "primary" | "error" | "secondary";
    background: "primaryContainer" | "errorContainer" | "secondaryContainer";
    foreground: "onPrimaryContainer" | "onErrorContainer" | "onSecondaryContainer";
  }
> = {
  success: {
    icon: "check-circle",
    accent: "primary",
    background: "primaryContainer",
    foreground: "onPrimaryContainer",
  },
  error: {
    icon: "alert-circle",
    accent: "error",
    background: "errorContainer",
    foreground: "onErrorContainer",
  },
  info: {
    icon: "information",
    accent: "secondary",
    background: "secondaryContainer",
    foreground: "onSecondaryContainer",
  },
};

export function AppToastHost() {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<ToastMessage | null>(currentToast);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-12)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscriber = (toast: ToastMessage | null) => setMessage(toast);
    subscribers.add(subscriber);
    setMessage(currentToast);
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (!message) return;

    opacity.setValue(0);
    translateY.setValue(-12);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 18,
        stiffness: 180,
        useNativeDriver: true,
      }),
    ]).start();

    timer.current = setTimeout(
      () => Toast.hide(message.id),
      message.visibilityTime ?? 3500,
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [message, opacity, translateY]);

  if (!message) return null;

  const type = message.type ?? "info";
  const visual = toastStyles[type];
  const accentColor = colors[visual.accent];
  const foregroundColor = colors[visual.foreground];

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.position,
          {
            top: insets.top + 12,
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tutup notifikasi"
          onPress={() => Toast.hide()}
          style={[
            styles.card,
            {
              backgroundColor: colors[visual.background],
              borderLeftColor: accentColor,
            },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors[visual.background] },
            ]}
          >
            <MaterialCommunityIcons
              name={visual.icon}
              size={24}
              color={accentColor}
            />
          </View>
          <View style={styles.content}>
            {message.text1 ? (
              <Text style={[styles.title, { color: foregroundColor }]}>
                {message.text1}
              </Text>
            ) : null}
            {message.text2 ? (
              <Text style={[styles.description, { color: foregroundColor }]}>
                {message.text2}
              </Text>
            ) : null}
          </View>
          <MaterialCommunityIcons
            name="close"
            size={18}
            color={foregroundColor}
            style={styles.closeIcon}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  position: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 9999,
    elevation: 9999,
  },
  card: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 14,
    borderRadius: 18,
    borderLeftWidth: 4,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
  },
  iconContainer: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins_Bold",
    includeFontPadding: false,
    fontSize: 14,
    lineHeight: 20,
  },
  description: {
    marginTop: 2,
    fontFamily: "Poppins_Regular",
    includeFontPadding: false,
    fontSize: 12,
    lineHeight: 18,
  },
  closeIcon: {
    marginLeft: 8,
    opacity: 0.7,
  },
});
