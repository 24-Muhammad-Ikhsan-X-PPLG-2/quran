import { FC } from "react";
import { SuratData } from "../types/surat";
import { Text, View } from "react-native";
import { useAppColors } from "../hooks/useAppColors";

type RenderSurfaceSurahProps = {
  surat: SuratData;
};

const RenderSurfaceSurah: FC<RenderSurfaceSurahProps> = ({ surat }) => {
  const colors = useAppColors();
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 8,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 24,
          borderRadius: 24,
          backgroundColor: colors.elevation.level4,
          borderWidth: 1,
          borderColor: colors.outlineVariant,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.onSurface,
            fontFamily: "Poppins_Bold",
            includeFontPadding: false,
            fontSize: 24,
          }}
        >
          {surat.namaLatin}
        </Text>
        <Text
          style={{
            color: colors.onSurfaceVariant,
            fontFamily: "Poppins_Regular",
            includeFontPadding: false,
            fontSize: 13,
            marginTop: 4,
          }}
        >
          {`${surat.jumlahAyat} ayat · ${surat.tempatTurun}`}
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: colors.onSurface,
            fontSize: 30,
            fontFamily: "Amiri_Regular",
            marginTop: 10,
          }}
        >
          {surat.nama}
        </Text>
        <View
          style={{
            height: 1,
            width: 56,
            backgroundColor: colors.outline,
            marginTop: 16,
            marginBottom: 16,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: colors.onSurface,
            fontSize: 25,
            fontFamily: "Amiri_Regular",
            lineHeight: 48,
          }}
        >
          بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
        </Text>
      </View>
    </View>
  );
};

export default RenderSurfaceSurah;
