/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

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
