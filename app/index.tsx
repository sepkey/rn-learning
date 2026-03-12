import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import ShoppingListItem from "../components/shopping-list-item";
import { theme } from "../theme";

export default function App() {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        placeholder="E.g. Coffee"
        style={styles.textInput}
        onChangeText={setValue}
        // keyboardType="name-phone-pad" //you can select the keyboard type for the inut
        returnKeyType="done" //you can change the text of return button
        onSubmitEditing={() => console.log("submitted")}
      />
      <ShoppingListItem name="Coffee" />
      <ShoppingListItem name="Tea" isCompleted />
      <ShoppingListItem name="Soda" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
  },
});
