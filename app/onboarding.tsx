/* eslint-disable prettier/prettier */
import { useUserStore } from "@/store/userStore";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

export default function OnboardingScreen() {
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);
  const router = useRouter();
  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Button title="Let me in!" onPress={handlePress} />
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
