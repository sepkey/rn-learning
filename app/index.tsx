import { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import ShoppingListItem from "../components/shopping-list-item";
import { theme } from "../theme";

type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

const initialValue: ShoppingListItemType[] = [
  { id: "1", name: "Coffee", isCompleted: false },
  { id: "2", name: "Tea", isCompleted: true },
  { id: "3", name: "Soda", isCompleted: false },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialValue);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    const newShoppingList = [
      { id: new Date().toISOString(), name: value, isCompleted: false },
      ...shoppingList,
    ];
    setShoppingList(newShoppingList);
    setValue("");
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      <TextInput
        value={value}
        placeholder="E.g. Coffee"
        style={styles.textInput}
        onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      {shoppingList.map((itm) => (
        <ShoppingListItem name={itm.name} isCompleted key={itm.id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
