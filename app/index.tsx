/* eslint-disable prettier/prettier */
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
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

  const handleDelete = (id: string) => {
    const newShoppingList = [...shoppingList].filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      // keyExtractor={} // in case we don't have the id
      data={shoppingList}
      stickyHeaderIndices={[0]}
      style={styles.container}
      ListHeaderComponent={
        <TextInput
          value={value}
          placeholder="E.g. Coffee"
          style={styles.textInput}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      ListEmptyComponent={() => (
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty.</Text>
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted
          onDelete={() => handleDelete(item.id)}
        />
      )}
    />
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
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
