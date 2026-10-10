import React from "react";
import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppColors } from "../hooks/useAppColors";

export default function RenderDropdownMenu() {
  const [visible, setVisible] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const colors = useAppColors();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="More options"
        onPress={openMenu}
        style={{ width: 48, height: 48, alignItems: "center", justifyContent: "center" }}
      >
        <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.onSurface} />
      </Pressable>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={closeMenu}>
        <Pressable
          onPress={closeMenu}
          style={{ flex: 1, backgroundColor: "transparent" }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              position: "absolute",
              top: 56,
              right: 12,
              minWidth: 180,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: colors.elevation.level2,
              elevation: 6,
            }}
          >
            <Pressable
              onPress={() => {
                setVisibleDialog(true);
                setVisible(false);
              }}
              style={{ paddingHorizontal: 16, paddingVertical: 12 }}
            >
              <Text
                style={{
                  color: colors.onSurface,
                  fontFamily: "Poppins_Bold",
                  includeFontPadding: false,
                }}
              >
                About me
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal
        visible={visibleDialog}
        transparent
        animationType="fade"
        onRequestClose={() => setVisibleDialog(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        >
          <View
            style={{
              padding: 24,
              borderRadius: 24,
              backgroundColor: colors.elevation.level2,
              elevation: 8,
            }}
          >
            <Text
              style={{
                color: colors.onSurface,
                fontFamily: "Poppins_Bold",
                includeFontPadding: false,
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              About me
            </Text>
            <Text
              style={{
                color: colors.onSurface,
                fontFamily: "Poppins_Regular",
                includeFontPadding: false,
              }}
            >
              "Saya adalah seorang programmer yg hobi buat aplikasi dan web"
              -ikhsan
            </Text>
            <Pressable
              onPress={() => setVisibleDialog(false)}
              style={{ alignSelf: "flex-end", marginTop: 24, padding: 8 }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: "Poppins_Bold",
                  includeFontPadding: false,
                }}
              >
                Oke
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
