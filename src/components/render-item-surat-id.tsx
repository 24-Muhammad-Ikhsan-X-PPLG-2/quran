import { Ayat } from "../types/surat";
import React, { FC, useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createAudioPlayer, type AudioPlayer } from "expo-audio";
import { useAppColors } from "../hooks/useAppColors";

type RenderItemSuratProps = {
  item: Ayat;
  onSoundFinished?: () => void;
  onSoundPlaying?: () => void;
  onPress?: () => void;
};

const RenderItemSurat: FC<RenderItemSuratProps> = ({
  item,
  onSoundFinished = () => {},
  onSoundPlaying = () => {},
  onPress = () => {},
}) => {
  const colors = useAppColors();
  const [soundState, setSoundState] = useState<AudioPlayer | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const onSoundFinishedRef = useRef(onSoundFinished);
  const onSoundPlayingRef = useRef(onSoundPlaying);
  onSoundFinishedRef.current = onSoundFinished;
  onSoundPlayingRef.current = onSoundPlaying;
  function playSound() {
    if (soundState) {
      soundState.play();
      setIsPaused(false);
    } else {
      const player = createAudioPlayer({ uri: item.audio["02"] });
      setSoundState(player);
      player.play();
      setIsPaused(false);
    }
  }
  function pauseSound() {
    if (soundState) {
      soundState.pause();
      setIsPaused(true);
    }
  }
  useEffect(() => {
    if (!soundState) return;
    const statusSubscription = soundState.addListener(
      "playbackStatusUpdate",
      (status) => {
        if (status.didJustFinish) {
          setSoundState(null);
          setIsPaused(false);
          onSoundFinishedRef.current();
        }
        if (status.playing) {
          onSoundPlayingRef.current();
        }
      }
    );
    return () => {
      statusSubscription.remove();
      soundState.remove();
    };
  }, [soundState]);

  return (
    <View
      style={{
        marginHorizontal: 16,
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 16,
        borderRadius: 20,
        backgroundColor: colors.elevation.level1,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
      }}
    >
      <View
        style={{
          width: 36,
          height: 36,
          paddingHorizontal: 5,
          backgroundColor: colors.primary,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: colors.onPrimary,
            fontFamily: "Poppins_Bold",
            includeFontPadding: false,
            fontSize: 14,
          }}
        >
          {item.nomorAyat}
        </Text>
      </View>
      <Text
        style={{
          textAlign: "right",
          color: colors.onSurface,
          fontSize: 30,
          fontFamily: "Amiri_Regular",
          lineHeight: 62,
          marginTop: 8,
        }}
      >
        {item.teksArab}
      </Text>
      <View
        style={{
          height: 1,
          backgroundColor: colors.outlineVariant,
          marginTop: 12,
          marginBottom: 12,
        }}
      />
      <Text
        style={{
          color: colors.primary,
          fontSize: 16,
          lineHeight: 26,
          fontFamily: "Poppins_Regular",
          includeFontPadding: false,
          marginBottom: 8,
        }}
      >
        {item.teksLatin}
      </Text>
      <Text
        style={{
          color: colors.onSurfaceVariant,
          fontSize: 15,
          lineHeight: 24,
          fontFamily: "Poppins_Regular",
          includeFontPadding: false,
        }}
      >
        {item.teksIndonesia}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          soundState && !isPaused
            ? `Jeda audio ayat ${item.nomorAyat}`
            : `Putar audio ayat ${item.nomorAyat}`
        }
        onPress={() => {
          onPress();
          if (soundState && !isPaused) {
            pauseSound();
          } else {
            playSound();
          }
        }}
        style={{
          alignSelf: "flex-end",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 12,
          paddingHorizontal: 12,
          paddingVertical: 7,
          borderRadius: 18,
          backgroundColor: colors.primaryContainer,
        }}
      >
        <MaterialCommunityIcons
          name={soundState && !isPaused ? "pause" : "play"}
          size={18}
          color={colors.onPrimaryContainer}
        />
        <Text
          style={{
            marginLeft: 6,
            color: colors.onPrimaryContainer,
            fontSize: 12,
            fontFamily: "Poppins_Bold",
            includeFontPadding: false,
          }}
        >
          {soundState && !isPaused ? "Jeda" : "Putar"}
        </Text>
      </Pressable>
    </View>
  );
};
export default RenderItemSurat;
