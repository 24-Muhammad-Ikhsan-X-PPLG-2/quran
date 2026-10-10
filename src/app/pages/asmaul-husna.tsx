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
          backgroundColor: colors.elevation.level4,
          height: 64,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.onSurface,
            fontFamily: "Poppins_Bold",
            includeFontPadding: false,
            fontSize: 28,
          }}
        >
          Asmaul Husna
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingHorizontal: 10,
        }}
      >
        <RenderFlashlistAsmaul
          asmaulHusna={asmaulHusna}
          FlashListRef={FlashListRef}
          translateYFAB={translateYFAB}
          handleOnScrollYFAB={handleOnScrollYFAB}
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
