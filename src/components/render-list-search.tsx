import { FlashList, FlashListRef } from "@shopify/flash-list";
import { isiQuranType } from "../types/quran";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { NativeScrollEvent } from "react-native";
import { FC } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { removeHtmlTags } from "../lib/utils";
import { router } from "expo-router";
import { useAppColors } from "../hooks/useAppColors";

type RenderListSearchProps = {
  quran: isiQuranType[];
  FlashListRef: React.RefObject<FlashListRef<isiQuranType> | null>;
  handleOnScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  keyword: string;
};

const RenderListSearch: FC<RenderListSearchProps> = ({
  FlashListRef,
  handleOnScroll,
  quran,
  keyword,
}) => {
  const colors = useAppColors();
  return (
    <FlashList
      data={quran}
      ref={FlashListRef}
      keyExtractor={(item) => item.nomor.toString()}
      onScroll={handleOnScroll}
      removeClippedSubviews={true}
      automaticallyAdjustKeyboardInsets
      ListHeaderComponent={
        <View
          style={{
            paddingHorizontal: 18,
            paddingTop: 18,
            paddingBottom: 8,
          }}
        >
          <Text
            style={{
              color: colors.onSurface,
              fontFamily: "Poppins_Bold",
              includeFontPadding: false,
              fontSize: 17,
            }}
          >
            {keyword.trim() ? "Hasil pencarian" : "Semua surat"}
          </Text>
          <Text
            style={{
              color: colors.onSurfaceVariant,
              fontFamily: "Poppins_Regular",
              includeFontPadding: false,
              fontSize: 12,
              marginTop: 3,
            }}
          >
            {quran.length} surat ditemukan
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 32,
            paddingTop: 56,
          }}
        >
          <View
            style={{
              width: 68,
              height: 68,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 24,
              backgroundColor: colors.elevation.level1,
            }}
          >
            <MaterialCommunityIcons
              name="book-search-outline"
              size={32}
              color={colors.primary}
            />
          </View>
          <Text
            style={{
              color: colors.onSurface,
              fontFamily: "Poppins_Bold",
              includeFontPadding: false,
              fontSize: 16,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            Surat belum ditemukan
          </Text>
          <Text
            style={{
              color: colors.onSurfaceVariant,
              fontFamily: "Poppins_Regular",
              includeFontPadding: false,
              fontSize: 13,
              lineHeight: 20,
              marginTop: 6,
              textAlign: "center",
            }}
          >
            Coba kata kunci lain, seperti nama surat, arti, atau nomor surat.
          </Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: 24 }}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => router.replace(`/surat/${item.nomor}`)}
            style={{
              minHeight: 84,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 16,
              marginBottom: 9,
              paddingVertical: 13,
              paddingHorizontal: 14,
              borderRadius: 18,
              backgroundColor: colors.elevation.level1,
              borderWidth: 1,
              borderColor: colors.outlineVariant,
            }}
          >
            <View
              style={{
                width: 42,
                height: 42,
                marginRight: 12,
                backgroundColor: colors.primary,
                borderRadius: 14,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colors.onPrimary,
                  fontWeight: "800",
                  fontSize: 18,
                  includeFontPadding: false,
                }}
              >
                {item.nomor}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontFamily: "Poppins_Bold",
                  includeFontPadding: false,
                }}
              >
                {item.namaLatin}
              </Text>
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Poppins_Regular",
                  includeFontPadding: false,
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {item.arti} · {item.jumlahAyat} ayat
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  color: colors.onSurfaceVariant,
                  fontFamily: "Poppins_Regular",
                  includeFontPadding: false,
                }}
              >
                {removeHtmlTags(item.deskripsi)}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", marginLeft: 8 }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontFamily: "Amiri_Regular",
                  fontSize: 20,
                }}
              >
                {item.nama}
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={18}
                color={colors.onSurfaceVariant}
              />
            </View>
          </Pressable>
        );
      }}
    />
  );
};

export default RenderListSearch;
