import BusinessButton from "@/components/business-button";
import { useUserStore } from "@/store/user-store";
import { theme } from "@/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);
  return (
    <View style={styles.container}>
      <BusinessButton
        title="Back to onboarding!"
        onPress={toggleHasOnboarded}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
