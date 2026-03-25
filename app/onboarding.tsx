import BusinessButton from "@/components/business-button";
import { useUserStore } from "@/store/userStore";
import { theme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

export default function OnboardingScreen() {
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);
  const router = useRouter();
  const handlePress = () => {
    toggleHasOnboarded();
    router.replace("/");
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.colorGreen, theme.appleGreen, theme.limeGreen]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <BusinessButton title="Let me in!" onPress={handlePress} />
    </LinearGradient>
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
