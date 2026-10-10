import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";
import { AsmaulHusnaType } from "../types/asmaul-husna";
import { SharedValue } from "react-native-reanimated";
import { FC, RefObject } from "react";
import { useAppColors } from "../hooks/useAppColors";

type RenderFlashlistAsmaulProps = {
  asmaulHusna: AsmaulHusnaType[];
  FlashListRef: RefObject<FlashList<AsmaulHusnaType>>;
  translateYFAB: SharedValue<number>;
  handleOnScrollYFAB: (e: any, translateYFAB: SharedValue<number>) => void;
};

const RenderFlashlistAsmaul: FC<RenderFlashlistAsmaulProps> = ({
  asmaulHusna,
  FlashListRef,
  translateYFAB,
  handleOnScrollYFAB,
}) => {
  const colors = useAppColors();
  return (
    <FlashList
      data={asmaulHusna}
      estimatedItemSize={100}
      ListEmptyComponent={() => <ActivityIndicator size="large" color={colors.primary} />}
      keyExtractor={(item) => item.urutan.toString()}
      removeClippedSubviews={true}
      ref={FlashListRef}
      onScroll={(e) => handleOnScrollYFAB(e, translateYFAB)}
      contentContainerStyle={{
        paddingBottom: 10,
      }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            marginBottom: 30,
          }}
        ></View>
      )}
      renderItem={({ item }) => (
        <View style={{ paddingVertical: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                marginLeft: 10,
                width: 30,
                height: 30,
                backgroundColor: colors.primary,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.onPrimary,
                  fontFamily: "Poppins_Bold",
                  includeFontPadding: false,
                  fontSize: 18,
                }}
              >
                {item.urutan}
              </Text>
            </View>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                color: colors.onSurface,
                fontSize: 28,
                fontFamily: "Amiri_Regular",
                fontWeight: "600",
                lineHeight: 75,
                marginHorizontal: 12,
              }}
            >
              {item.arab}
            </Text>
          </View>
          <View style={{ marginLeft: 52, marginBottom: 40, marginTop: 8 }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: 20,
                  fontFamily: "Poppins_Regular",
                  includeFontPadding: false,
                  marginBottom: 5,
                }}
              >
                {item.latin}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: colors.onSurfaceVariant,
                  fontFamily: "Poppins_Regular",
                  includeFontPadding: false,
                }}
              >
                {item.arti}
              </Text>
          </View>
        </View>
      )}
    />
  );
};
export default RenderFlashlistAsmaul;
