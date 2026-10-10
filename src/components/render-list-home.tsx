import { FlashList, FlashListRef } from "@shopify/flash-list";
import { isiQuranType } from "../types/quran";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";
import { FC, ReactElement, RefObject } from "react";
import { router } from "expo-router";
import { removeHtmlTags } from "../lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppColors } from "../hooks/useAppColors";

type RenderListHomeProps = {
  quran: isiQuranType[];
  FlashListRef: RefObject<FlashListRef<isiQuranType> | null>;
  handleOnScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  ListHeaderComponent: ReactElement;
};

const RenderListHome: FC<RenderListHomeProps> = ({
  quran,
  FlashListRef,
  handleOnScroll,
  ListHeaderComponent,
}) => {
  const colors = useAppColors();
  return (
    <FlashList
      data={quran}
      ref={FlashListRef}
      keyExtractor={(item) => item.nomor.toString()}
      onScroll={handleOnScroll}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={({ item }) => {
        return <RenderListItem item={item} />;
      }}
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: colors.outlineVariant }} />
      )}
    />
  );
};

type RenderListItemProps = {
  item: isiQuranType;
};

const RenderListItem: FC<RenderListItemProps> = ({ item }) => {
  const colors = useAppColors();
  return (
    <Pressable
      onPress={() => router.push(`/surat/${item.nomor}`)}
      style={{
        minHeight: 76,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingRight: 16,
      }}
    >
      <View
        style={{
          marginLeft: 10,
          width: 45,
          height: 45,
          backgroundColor: colors.primary,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.onPrimary,
            fontSize: 18,
            fontFamily: "Poppins_Bold",
            includeFontPadding: false,
          }}
        >
          {item.nomor}
        </Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 12 }}>
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
      <Text style={{ color: colors.primary }}>{item.nama}</Text>
    </Pressable>
  );
};
export default RenderListHome;
