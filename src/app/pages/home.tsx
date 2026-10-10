import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { data } from "@/src/data/dataQuran.json";
import { FlashListRef } from "@shopify/flash-list";
import { isiQuranType } from "../../types/quran";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import RenderDropdownMenu from "../../components/render-dropdown-home";
import RenderListHome from "@/src/components/render-list-home";
import { handleOnScrollYFAB } from "@/src/lib/utils";
import { useAppColors } from "@/src/hooks/useAppColors";
import { useMainTabNavigation } from "@/src/hooks/useMainTabNavigation";

const Home = () => {
  const colors = useAppColors();
  const setActiveTab = useMainTabNavigation();
  const [quran] = useState(data);
  const totalAyat = quran.reduce((total, surat) => total + surat.jumlahAyat, 0);
  const FlashListRef = useRef<FlashListRef<isiQuranType>>(null);
  const translateYFAB = useSharedValue(300);
  const AnimatedFAB = Animated.createAnimatedComponent(Pressable);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYFAB.value }],
    };
  });
  return (
    <>
      <View
        style={{
          backgroundColor: colors.background,
          minHeight: 68,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: colors.outlineVariant,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: colors.primaryContainer,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons
              name="book-open-page-variant"
              size={22}
              color={colors.onPrimaryContainer}
            />
          </View>
          <View>
            <Text
              style={{
                color: colors.onSurface,
                fontFamily: "Poppins_Bold",
                fontSize: 20,
                includeFontPadding: false,
              }}
            >
              Al-Qur'an
            </Text>
            <Text
              style={{
                color: colors.onSurfaceVariant,
                fontFamily: "Poppins_Regular",
                fontSize: 11,
                includeFontPadding: false,
                marginTop: 2,
              }}
            >
              Ruang untuk menenangkan hati
            </Text>
          </View>
        </View>
        <RenderDropdownMenu />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <RenderListHome
          quran={quran}
          FlashListRef={FlashListRef}
          handleOnScroll={(e) => handleOnScrollYFAB(e, translateYFAB)}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 18, paddingTop: 18 }}>
              <View
                style={{
                  overflow: "hidden",
                  padding: 22,
                  borderRadius: 26,
                  backgroundColor: colors.primary,
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: colors.onPrimary,
                  }}
                >
                  <MaterialCommunityIcons
                    name="star-crescent"
                    size={14}
                    color={colors.primary}
                  />
                  <Text
                    style={{
                      marginLeft: 6,
                      color: colors.primary,
                      fontFamily: "Poppins_Bold",
                      fontSize: 10,
                      includeFontPadding: false,
                      letterSpacing: 0.5,
                    }}
                  >
                    TEMANI HARI DENGAN AL-QUR'AN
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 18,
                    color: colors.onPrimary,
                    fontFamily: "Poppins_Bold",
                    fontSize: 25,
                    includeFontPadding: false,
                    lineHeight: 34,
                  }}
                >
                  Satu ayat hari ini,{"\n"}ketenangan untuk hati.
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    color: colors.onPrimary,
                    opacity: 0.84,
                    fontFamily: "Poppins_Regular",
                    fontSize: 13,
                    includeFontPadding: false,
                    lineHeight: 20,
                  }}
                >
                  Luangkan waktu sejenak untuk membaca dan merenungi ayat-Nya.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push("/surat/1")}
                  style={{
                    alignSelf: "flex-start",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 18,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 14,
                    backgroundColor: colors.onPrimary,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: "Poppins_Bold",
                      fontSize: 13,
                      includeFontPadding: false,
                    }}
                  >
                    Mulai membaca
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={17}
                    color={colors.primary}
                    style={{ marginLeft: 8 }}
                  />
                </Pressable>
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  size={112}
                  color={colors.onPrimary}
                  style={{
                    position: "absolute",
                    right: -15,
                    bottom: -19,
                    opacity: 0.08,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 14,
                  gap: 12,
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push("/search")}
                  style={{
                    flex: 1,
                    minHeight: 82,
                    padding: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 18,
                    backgroundColor: colors.elevation.level1,
                    borderWidth: 1,
                    borderColor: colors.outlineVariant,
                  }}
                >
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 13,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.primaryContainer,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="magnify"
                      size={21}
                      color={colors.onPrimaryContainer}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      style={{
                        color: colors.onSurface,
                        fontFamily: "Poppins_Bold",
                        fontSize: 12,
                        includeFontPadding: false,
                      }}
                    >
                      Cari surat
                    </Text>
                    <Text
                      style={{
                        color: colors.onSurfaceVariant,
                        fontFamily: "Poppins_Regular",
                        fontSize: 10,
                        includeFontPadding: false,
                        marginTop: 2,
                      }}
                    >
                      Temukan bacaan
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setActiveTab(1)}
                  style={{
                    flex: 1,
                    minHeight: 82,
                    padding: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: 18,
                    backgroundColor: colors.elevation.level1,
                    borderWidth: 1,
                    borderColor: colors.outlineVariant,
                  }}
                >
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 13,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: colors.primaryContainer,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="flower-tulip"
                      size={21}
                      color={colors.onPrimaryContainer}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      style={{
                        color: colors.onSurface,
                        fontFamily: "Poppins_Bold",
                        fontSize: 12,
                        includeFontPadding: false,
                      }}
                    >
                      Asmaul Husna
                    </Text>
                    <Text
                      style={{
                        color: colors.onSurfaceVariant,
                        fontFamily: "Poppins_Regular",
                        fontSize: 10,
                        includeFontPadding: false,
                        marginTop: 2,
                      }}
                    >
                      99 nama indah
                    </Text>
                  </View>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 22,
                  marginBottom: 10,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.onSurface,
                      fontFamily: "Poppins_Bold",
                      fontSize: 18,
                      includeFontPadding: false,
                    }}
                  >
                    Daftar surat
                  </Text>
                  <Text
                    style={{
                      color: colors.onSurfaceVariant,
                      fontFamily: "Poppins_Regular",
                      fontSize: 12,
                      includeFontPadding: false,
                      marginTop: 2,
                    }}
                  >
                    Pilih surat untuk mulai membaca
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    paddingHorizontal: 11,
                    paddingVertical: 7,
                    borderRadius: 14,
                    backgroundColor: colors.elevation.level1,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: "Poppins_Bold",
                      fontSize: 13,
                      includeFontPadding: false,
                    }}
                  >
                    {quran.length} surat
                  </Text>
                  <Text
                    style={{
                      color: colors.onSurfaceVariant,
                      fontFamily: "Poppins_Regular",
                      fontSize: 10,
                      includeFontPadding: false,
                    }}
                  >
                    {totalAyat.toLocaleString("id-ID")} ayat
                  </Text>
                </View>
              </View>
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
            animatedStyle,
          ]}
          onPress={() => {
            FlashListRef.current?.scrollToOffset({
              offset: 0,
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
};

export default Home;
