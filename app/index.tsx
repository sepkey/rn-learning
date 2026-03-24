/* eslint-disable prettier/prettier */
import { theme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
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
