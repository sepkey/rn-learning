import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

type Props = {
  name: string;
};

export default function ShoppingListItem({ name }: Props) {
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
    <View style={styles.itemContainer}>
      <Text style={{ fontSize: 18, fontWeight: "200" }}>{name}</Text>
      <TouchableOpacity style={styles.button} onPress={handleDlete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
