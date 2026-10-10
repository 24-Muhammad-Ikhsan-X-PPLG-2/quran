import { FC } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import { useAppColors } from "../hooks/useAppColors";

type RenderPortalSurahProps = {
  isLoading: boolean;
  isDialogBackShown: boolean;
  handleDismissBackDialog: () => void;
  handleSaveConditionScroll: () => void;
  handleCancelBack: () => void;
};

const RenderPortalSurah: FC<RenderPortalSurahProps> = ({
  isLoading,
  handleSaveConditionScroll,
  handleCancelBack,
  isDialogBackShown,
  handleDismissBackDialog,
}) => {
  const colors = useAppColors();
  return (
    <>
      <Modal visible={isLoading} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.backdrop,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={{
              color: colors.onSurface,
              textAlign: "center",
              fontSize: 28,
              fontFamily: "Poppins_Bold",
              includeFontPadding: false,
              marginTop: 10,
            }}
          >
            Please wait...
          </Text>
        </View>
      </Modal>
      <Modal
        visible={isDialogBackShown}
        transparent
        animationType="fade"
        onRequestClose={handleDismissBackDialog}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: colors.backdrop,
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
              Ingin simpan?
            </Text>
            <Text
              style={{
                color: colors.onSurface,
                fontFamily: "Poppins_Regular",
                includeFontPadding: false,
              }}
            >
              Kamu ingin simpan kondisi sekarang?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 24,
              }}
            >
              <Pressable
                onPress={handleCancelBack}
                style={{ padding: 8, marginRight: 12 }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: "Poppins_Regular",
                    includeFontPadding: false,
                  }}
                >
                  No
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSaveConditionScroll}
                style={{ padding: 8 }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: "Poppins_Regular",
                    includeFontPadding: false,
                  }}
                >
                  Yes
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RenderPortalSurah;
