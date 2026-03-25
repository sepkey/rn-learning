import { theme } from "@/theme";
import * as Haptics from "expo-haptics";
import React from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = { title: string; onPress: () => void };

export default function BusinessButton({ onPress, title }: ButtonProps) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <Pressable
      style={({ pressed }) => {
        if (pressed) return [styles.button, styles.buttonPressed];
        return styles.button;
      }}
      onPress={handlePress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 18, fontWeight: "bold", color: theme.colorWhite },
  button: {
    paddingHorizontal: 18,
    backgroundColor: theme.colorGreen,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonPressed: {
    backgroundColor: theme.leafyGreen,
  },
});
