import React, { FC } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useAppColors } from "../hooks/useAppColors";

type RenderLoadingType = {
  title?: string;
};

export const RenderLoading: FC<RenderLoadingType> = ({ title = "Quran" }) => {
  const colors = useAppColors();
  return (
    <>
      <View
        style={{
          backgroundColor: colors.elevation.level4,
          height: 64,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.onSurface,
            fontWeight: "700",
            fontSize: 28,
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </>
  );
};
