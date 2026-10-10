import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Toast } from "./app-toast";
import { useAppColors } from "../hooks/useAppColors";

type Props = {
  id: number;
};

const RenderDropdownMenuSurat: FC<Props> = ({ id }) => {
  const [menuShown, setMenuShown] = useState(false);
  const [isConditionState, setIsConditionState] = useState(0);
  const colors = useAppColors();
  async function checkConditionState() {
    try {
      const data = await AsyncStorage.getItem(`scroll-${id}`);
      if (!data) return 0;
      return Number(data);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Gagal mengecek kondisi",
        text2: "Silahkan coba lagi",
      });
      return 0;
    }
  }
  async function handleDeleteConditionState() {
    try {
      await AsyncStorage.removeItem(`scroll-${id}`);
      setIsConditionState(0);
      setMenuShown(false);
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Kondisi berhasil dihapus",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Gagal menghapus kondisi",
        text2: "Silahkan coba lagi",
      });
    }
  }
  useEffect(() => {
    checkConditionState().then((data) => setIsConditionState(data));
  }, []);
  return (
    <>
      {isConditionState !== 0 && (
        <>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="More options"
            onPress={() => setMenuShown(true)}
            style={{ width: 48, height: 48, alignItems: "center", justifyContent: "center" }}
          >
            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.onSurface} />
          </Pressable>
          <Modal
            visible={menuShown}
            transparent
            animationType="fade"
            onRequestClose={() => setMenuShown(false)}
          >
            <Pressable
              onPress={() => setMenuShown(false)}
              style={{ flex: 1, backgroundColor: "transparent" }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 56,
                  right: 12,
                  minWidth: 220,
                  paddingVertical: 8,
                  borderRadius: 8,
                  backgroundColor: colors.elevation.level2,
                  elevation: 6,
                }}
              >
                <Pressable
                  onPress={handleDeleteConditionState}
                  style={{ paddingHorizontal: 16, paddingVertical: 12 }}
                >
                  <Text
                    style={{
                      color: colors.onSurface,
                      fontFamily: "Poppins_Regular",
                      includeFontPadding: false,
                    }}
                  >
                    Menghapus kondisi sebelumnya
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>
        </>
      )}
    </>
  );
};
export default RenderDropdownMenuSurat;
