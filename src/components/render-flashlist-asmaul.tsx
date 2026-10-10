import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";
import { AsmaulHusnaType } from "../types/asmaul-husna";
import { SharedValue } from "react-native-reanimated";
import { FC, ReactElement, RefObject } from "react";
import { useAppColors } from "../hooks/useAppColors";

type RenderFlashlistAsmaulProps = {
  asmaulHusna: AsmaulHusnaType[];
  FlashListRef: RefObject<FlashList<AsmaulHusnaType>>;
  translateYFAB: SharedValue<number>;
  handleOnScrollYFAB: (e: any, translateYFAB: SharedValue<number>) => void;
  ListHeaderComponent: ReactElement;
};

const RenderFlashlistAsmaul: FC<RenderFlashlistAsmaulProps> = ({
  asmaulHusna,
  FlashListRef,
  translateYFAB,
  handleOnScrollYFAB,
  ListHeaderComponent,
}) => {
  const colors = useAppColors();
  return (
    <FlashList
      data={asmaulHusna}
      estimatedItemSize={100}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={() => (
        <ActivityIndicator size="large" color={colors.primary} />
      )}
      keyExtractor={(item) => item.urutan.toString()}
      removeClippedSubviews={true}
      ref={FlashListRef}
      onScroll={(e) => handleOnScrollYFAB(e, translateYFAB)}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <View
          style={{
            marginHorizontal: 4,
            padding: 17,
            borderRadius: 20,
            backgroundColor: colors.elevation.level1,
            borderWidth: 1,
            borderColor: colors.outlineVariant,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                minWidth: 36,
                height: 36,
                paddingHorizontal: 7,
                borderRadius: 13,
                backgroundColor: colors.primaryContainer,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.onPrimaryContainer,
                  fontFamily: "Poppins_Bold",
                  includeFontPadding: false,
                  fontSize: 13,
                }}
              >
                {String(item.urutan).padStart(2, "0")}
              </Text>
            </View>
            <Text
              style={{
                flex: 1,
                textAlign: "right",
                color: colors.onSurface,
                fontSize: 32,
                fontFamily: "Amiri_Regular",
                lineHeight: 58,
                marginLeft: 12,
              }}
            >
              {item.arab}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: colors.outlineVariant,
              marginTop: 10,
              marginBottom: 11,
            }}
          />
          <Text
            style={{
              color: colors.primary,
              fontSize: 17,
              lineHeight: 25,
              fontFamily: "Poppins_Bold",
              includeFontPadding: false,
            }}
          >
            {item.latin}
          </Text>
          <Text
            style={{
              marginTop: 3,
              fontSize: 14,
              lineHeight: 21,
              color: colors.onSurfaceVariant,
              fontFamily: "Poppins_Regular",
              includeFontPadding: false,
            }}
          >
            {item.arti}
          </Text>
        </View>
      )}
    />
  );
};
export default RenderFlashlistAsmaul;
