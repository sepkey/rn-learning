/* eslint-disable prettier/prettier */
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import ShoppingListItem from "../components/shopping-list-item";
import { theme } from "../theme";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
};

const initialValue: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Soda" },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialValue);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    const newShoppingList = [
      { id: new Date().toISOString(), name: value },
      ...shoppingList,
    ];
    setShoppingList(newShoppingList);
    setValue("");
  };

  const handleDelete = (id: string) => {
    const newShoppingList = [...shoppingList].filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = [...shoppingList].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completedAtTimeStamp: item.completedAtTimeStamp
            ? undefined
            : Date.now(),
        };
      }
      return item;
    });

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
          isCompleted={!!item.completedAtTimeStamp}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingVertical: 12,
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
