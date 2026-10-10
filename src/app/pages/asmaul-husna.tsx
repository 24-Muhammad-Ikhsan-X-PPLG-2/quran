import { Pressable, Text, View } from "react-native";
import { memo, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dataAsmaul from "../../data/dataAsmaulHusna.json";
import { FlashListRef } from "@shopify/flash-list";
import { useFonts } from "expo-font";
import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";
import { RenderLoading } from "../../components/render-loading-global";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AsmaulHusnaType } from "@/src/types/asmaul-husna";
import { handleOnScrollYFAB } from "@/src/lib/utils";
import RenderFlashlistAsmaul from "@/src/components/render-flashlist-asmaul";
import { useAppColors } from "@/src/hooks/useAppColors";

const AsmaulHusna = memo(() => {
  const colors = useAppColors();
  const [fontsLoaded] = useFonts({
    Amiri_Regular: Amiri_400Regular,
    Amiri_Bold: Amiri_700Bold,
  });
  const FlashListRef = useRef<FlashListRef<AsmaulHusnaType>>(null);
  const [asmaulHusna, setAsmaulHusna] = useState(dataAsmaul);
  const AnimatedFAB = Animated.createAnimatedComponent(Pressable);
  const translateYFAB = useSharedValue(300);
  const fabStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYFAB.value }],
    };
  });

  if (!fontsLoaded) {
    return <RenderLoading title="Asmaul Husna" />;
  }
  return (
    <>
      <View
        style={{
          minHeight: 68,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.outlineVariant,
        }}
      >
        <View
          style={{
            width: 42,
            height: 42,
            marginRight: 12,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primaryContainer,
          }}
        >
          <MaterialCommunityIcons
            name="flower-tulip"
            size={22}
            color={colors.onPrimaryContainer}
          />
        </View>
        <Text
          style={{
            color: colors.onSurface,
            fontFamily: "Poppins_Bold",
            includeFontPadding: false,
            fontSize: 20,
          }}
        >
          Asmaul Husna
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingHorizontal: 12,
        }}
      >
        <RenderFlashlistAsmaul
          asmaulHusna={asmaulHusna}
          FlashListRef={FlashListRef}
          translateYFAB={translateYFAB}
          handleOnScrollYFAB={handleOnScrollYFAB}
          ListHeaderComponent={
            <View
              style={{
                marginTop: 16,
                marginBottom: 14,
                padding: 20,
                borderRadius: 24,
                backgroundColor: colors.primary,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 20,
                  backgroundColor: colors.onPrimary,
                }}
              >
                <MaterialCommunityIcons
                  name="star-four-points"
                  size={14}
                  color={colors.primary}
                />
                <Text
                  style={{
                    marginLeft: 6,
                    color: colors.primary,
                    fontFamily: "Poppins_Bold",
                    includeFontPadding: false,
                    fontSize: 10,
                    letterSpacing: 0.4,
                  }}
                >
                  99 NAMA INDAH
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 14,
                  color: colors.onPrimary,
                  fontFamily: "Poppins_Bold",
                  includeFontPadding: false,
                  fontSize: 21,
                  lineHeight: 30,
                }}
              >
                Kenali nama-Nya,{"\n"}temukan maknanya.
              </Text>
              <Text
                style={{
                  marginTop: 7,
                  color: colors.onPrimary,
                  opacity: 0.86,
                  fontFamily: "Poppins_Regular",
                  includeFontPadding: false,
                  fontSize: 12,
                  lineHeight: 19,
                }}
              >
                Luangkan waktu untuk membaca satu per satu nama dan artinya.
              </Text>
              <MaterialCommunityIcons
                name="flower-tulip"
                size={104}
                color={colors.onPrimary}
                style={{
                  position: "absolute",
                  right: -14,
                  bottom: -18,
                  opacity: 0.09,
                }}
              />
            </View>
          }
        />
        <AnimatedFAB
          style={[
            {
              position: "absolute",
              right: 20,
              bottom: 20,
              width: 56,
              height: 56,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primaryContainer,
            },
            fabStyle,
          ]}
          onPress={() => {
            if (FlashListRef.current) {
              FlashListRef.current.scrollToIndex({
                index: 0,
                animated: true,
              });
            }
          }}
        >
          <MaterialCommunityIcons
            name="arrow-up"
            size={24}
            color={colors.onPrimaryContainer}
          />
        </AnimatedFAB>
      </View>
    </>
  );
});
export default AsmaulHusna;
