import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashListRef } from "@shopify/flash-list";
import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";
import { useFonts } from "expo-font";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Toast } from "../components/app-toast";
import { Ayat, SuratData } from "../types/surat";

export const useSuratDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const flashListRef = useRef<FlashListRef<Ayat>>(null);
  const [surat, setSurat] = useState<SuratData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogBackShown, setIsDialogBackShown] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [fontsLoaded] = useFonts({
    Amiri_Regular: Amiri_400Regular,
    Amiri_Bold: Amiri_700Bold,
  });

  const restoreScrollPosition = useCallback(async () => {
    try {
      const savedPosition = await AsyncStorage.getItem(`scroll-${id}`);
      const offset = savedPosition ? Number(savedPosition) : 0;
      if (offset && flashListRef.current) {
        flashListRef.current.scrollToOffset({ offset, animated: true });
        Toast.show({
          type: "info",
          text1: "Info",
          text2: "Scroll position restored",
        });
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unexpected error occured",
      });
    }
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    async function loadSurat() {
      try {
        const res = await fetch(`https://equran.id/api/v2/surat/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        const { data }: { data: SuratData } = await res.json();
        if (isActive) {
          setSurat(data);
        }
      } catch {
        if (isActive) {
          Toast.show({
            type: "error",
            text1: "Gagal memuat surat",
            text2: controller.signal.aborted
              ? "Permintaan terlalu lama. Silakan coba lagi."
              : "Terjadi kesalahan saat mengambil data.",
          });
          router.replace("/");
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }

    void loadSurat();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setIsDialogBackShown(true);
        return true;
      },
    );

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      controller.abort();
      backHandler.remove();
    };
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      void restoreScrollPosition();
    }
  }, [isLoading, restoreScrollPosition]);

  async function handleSaveConditionScroll() {
    try {
      await AsyncStorage.setItem(`scroll-${id}`, scrollY.toString());
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Successfully saved",
      });
      setIsDialogBackShown(false);
      router.back();
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Unexpected error occured",
      });
    }
    setIsDialogBackShown(false);
  }

  function handleCancelBack() {
    setIsDialogBackShown(false);
    router.back();
  }

  function handleDismissBackDialog() {
    setIsDialogBackShown(false);
  }

  function handleShowBackDialog() {
    setIsDialogBackShown(true);
  }

  function handleListLoad() {
    setIsLoading(false);
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollY(Math.floor(event.nativeEvent.contentOffset.y));
  }

  return {
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
  };
};
