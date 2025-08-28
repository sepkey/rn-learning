import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "./theme";

export default function App() {
  const handleDlete = () => {
    Alert.alert("Are you sure to do this?", "delete the item", [
      {
        text: "Yes",
        onPress: () => console.log("Ok,deleting"),
        style: "destructive",
      },
      {
        text: "Cancel",
        onPress: () => console.log("No,Calncel"),
        style: "cancel",
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={{ fontSize: 18, fontWeight: "200" }}>Coffee</Text>{" "}
        <TouchableOpacity style={styles.button} onPress={handleDlete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCelurean,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    textTransform: "uppercase",
    color: theme.colorWhite,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
