import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import RenderDropdownMenuSurat from "@/src/components/render-dropdown-surat";
import RenderItemSurat from "@/src/components/render-item-surat-id";
import { RenderLoading } from "@/src/components/render-loading-global";
import RenderSurfaceSurah from "@/src/components/render-surface-surah";
import RenderPortalSurah from "@/src/components/render-portal-surah";
import { useAppColors } from "@/src/hooks/useAppColors";
import { useSuratDetail } from "@/src/hooks/useSuratDetail";

const SuratDetail = () => {
  const {
    flashListRef,
    fontsLoaded,
    handleCancelBack,
    handleDismissBackDialog,
    handleListLoad,
    handleSaveConditionScroll,
    handleScroll,
    handleShowBackDialog,
    id,
    isDialogBackShown,
    isLoading,
    surat,
  } = useSuratDetail();
  const colors = useAppColors();

  if (!surat) {
    return <RenderLoading />;
  }
  if (!fontsLoaded) {
    return <RenderLoading />;
  }
  return (
    <>
      <RenderPortalSurah
        isLoading={isLoading}
        handleSaveConditionScroll={handleSaveConditionScroll}
        handleCancelBack={handleCancelBack}
        handleDismissBackDialog={handleDismissBackDialog}
        isDialogBackShown={isDialogBackShown}
      />
      <View
        style={{
          backgroundColor: colors.elevation.level4,
          minHeight: 64,
          paddingHorizontal: 12,
          paddingVertical: 6,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: colors.outlineVariant,
        }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={handleShowBackDialog}
          style={{
            width: 48,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.onSurface}
          />
        </Pressable>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            color: colors.onSurface,
            fontFamily: "Poppins_Bold",
            includeFontPadding: false,
            fontSize: 20,
            marginLeft: 4,
          }}
        >
          {`Surat ${surat.namaLatin}`}
        </Text>
        <RenderDropdownMenuSurat id={Number(id)} />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <View
          style={{
            marginTop: 10,
            flex: 1,
          }}
        >
          <FlashList
            data={surat.ayat}
            ListEmptyComponent={() => (
              <Text
                style={{
                  textAlign: "center",
                  color: colors.onSurfaceVariant,
                  padding: 24,
                  fontFamily: "Poppins_Regular",
                  includeFontPadding: false,
                }}
              >
                Tidak ada ayat untuk ditampilkan.
              </Text>
            )}
            keyExtractor={(item) => item.nomorAyat.toString()}
            ref={flashListRef}
            onLoad={handleListLoad}
            contentContainerStyle={{
              paddingBottom: 32,
              paddingTop: 8,
            }}
            onScroll={handleScroll}
            scrollEnabled={true}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 12,
                }}
              />
            )}
            renderItem={({ item }) => {
              if (item.nomorAyat === 1) {
                return (
                  <>
                    <RenderSurfaceSurah surat={surat} />
                    <RenderItemSurat item={item} />
                  </>
                );
              }
              return <RenderItemSurat item={item} />;
            }}
          />
        </View>
      </View>
    </>
  );
};

export default SuratDetail;
