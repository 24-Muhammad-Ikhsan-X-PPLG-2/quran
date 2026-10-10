import { Pressable, Text, TextInput, View } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { handleOnScrollYFAB } from "@/src/lib/utils";
import { FlashListRef } from "@shopify/flash-list";
import { data } from "@/src/data/dataQuran.json";
import { isiQuranType } from "@/src/types/quran";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import RenderListSearch from "@/src/components/render-list-search";
import { useAppColors } from "@/src/hooks/useAppColors";

export default function Search() {
  const colors = useAppColors();
  const [keyword, setKeyword] = useState("");
  const translateYFAB = useSharedValue(300);
  const AnimatedFAB = Animated.createAnimatedComponent(Pressable);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateYFAB.value }],
  }));
  const flashListRef = useRef<FlashListRef<isiQuranType>>(null);
  const normalizedKeyword = normalizeSearchText(keyword);
  const quran = useMemo(
    () =>
      normalizedKeyword
        ? data.filter((item) =>
            [
              item.namaLatin,
              item.nama,
              item.arti,
              item.nomor.toString(),
            ].some((value) => matchesSearch(value, normalizedKeyword)),
          )
        : data,
    [normalizedKeyword],
  );

  useEffect(() => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [normalizedKeyword]);

  return (
    <>
      <View
        style={{
          backgroundColor: colors.background,
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 14,
          borderBottomWidth: 1,
          borderBottomColor: colors.outlineVariant,
        }}
      >
        <View
          style={{
            minHeight: 48,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Kembali"
            onPress={() => router.back()}
            style={{
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
              borderRadius: 14,
              backgroundColor: colors.elevation.level1,
            }}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={22}
              color={colors.onSurface}
            />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.onSurface,
                fontFamily: "Poppins_Bold",
                includeFontPadding: false,
                fontSize: 18,
              }}
            >
              Cari surat
            </Text>
            <Text
              style={{
                color: colors.onSurfaceVariant,
                fontFamily: "Poppins_Regular",
                includeFontPadding: false,
                fontSize: 11,
                marginTop: 2,
              }}
            >
              Temukan surat yang ingin dibaca
            </Text>
          </View>
        </View>

        <View
          style={{
            minHeight: 54,
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 15,
            paddingRight: 8,
            borderRadius: 17,
            borderWidth: 1,
            borderColor: keyword ? colors.primary : colors.outlineVariant,
            backgroundColor: colors.elevation.level1,
          }}
        >
          <MaterialCommunityIcons
            name="magnify"
            size={22}
            color={keyword ? colors.primary : colors.onSurfaceVariant}
          />
          <TextInput
            placeholder="Nama surat, arti, atau nomor..."
            placeholderTextColor={colors.onSurfaceVariant}
            accessibilityLabel="Cari nama, arti, atau nomor surat"
            autoFocus
            returnKeyType="search"
            autoCapitalize="none"
            style={{
              flex: 1,
              minHeight: 52,
              paddingHorizontal: 11,
              color: colors.onSurface,
              fontFamily: "Poppins_Regular",
              includeFontPadding: false,
              fontSize: 13,
            }}
            value={keyword}
            onChangeText={setKeyword}
          />
          {keyword.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Hapus pencarian"
              onPress={() => setKeyword("")}
              style={{
                width: 38,
                height: 38,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 13,
              }}
            >
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color={colors.onSurfaceVariant}
              />
            </Pressable>
          ) : null}
        </View>
      </View>
      <View style={{ backgroundColor: colors.background, flex: 1 }}>
        <RenderListSearch
          FlashListRef={flashListRef}
          handleOnScroll={(event) =>
            handleOnScrollYFAB(event, translateYFAB)
          }
          quran={quran}
          keyword={keyword}
        />
        <AnimatedFAB
          accessibilityRole="button"
          accessibilityLabel="Kembali ke hasil pertama"
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
            animatedStyle,
          ]}
          onPress={() => {
            flashListRef.current?.scrollToIndex({
              index: 0,
              animated: true,
            });
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
}

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u064b-\u065f\u0670]/g, "")
    .toLocaleLowerCase("id-ID")
    .replace(/[-_]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function matchesSearch(value: string, keyword: string) {
  const normalizedValue = normalizeSearchText(value);
  return (
    normalizedValue.includes(keyword) ||
    normalizedValue.split(" ").some((word) => word.startsWith(keyword))
  );
}
