import BusinessButton from "@/components/business-button";
import BusinessImage from "@/components/business-image";
import { Paths } from "@/paths";
import { useUserStore } from "@/store/user-store";
import { theme } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function OnboardingScreen() {
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);
  const router = useRouter();
  const handlePress = () => {
    toggleHasOnboarded();
    router.replace(Paths.Home);
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.colorGreen, theme.appleGreen, theme.limeGreen]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View>
        <Text style={styles.heading}>Plantly</Text>
        <Text style={styles.tagLine}>
          Keep your plants healthy and hydrated!
        </Text>
      </View>
      <BusinessImage />
      <BusinessButton title="Let me in!" onPress={handlePress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  heading: {
    fontSize: 42,
    fontWeight: "bold",
    color: theme.colorWhite,
    marginBottom: 12,
    textAlign: "center",
  },
  tagLine: {
    fontSize: 24,
    color: theme.colorWhite,
    textAlign: "center",
  },
});
