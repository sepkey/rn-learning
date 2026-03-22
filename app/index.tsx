/* eslint-disable prettier/prettier */
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ShoppingListItem from "../components/shopping-list-item";
import { theme } from "../theme";
import { orderShoppingListItem } from "../utils/helpers";
import { getFromStorage, saveToStorage } from "../utils/storage";

const SHOPPING_LIST_KEY = "shopping-list";

export type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimeStamp?: number;
  lastUpdatedTimestamp: number;
};

const initialValue: ShoppingListItemType[] = [
  { id: "1", name: "Coffee", lastUpdatedTimestamp: 732763236232 },
  { id: "2", name: "Tea", lastUpdatedTimestamp: 732763236232 },
  { id: "3", name: "Soda", lastUpdatedTimestamp: 732763236232 },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialValue);
  const [value, setValue] = useState("");

  useEffect(() => {
    const fetchInit = async () => {
      const data = await getFromStorage(SHOPPING_LIST_KEY);
      if (data) {
        //For more advanced=> reanimated
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(data);
      }
    };
    fetchInit();
  }, []);

  const handleSubmit = () => {
    if (!value) return;
    const newShoppingList = [
      {
        id: new Date().toISOString(),
        name: value,
        lastUpdatedTimestamp: Date.now(),
      },
      ...shoppingList,
    ];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
    saveToStorage(SHOPPING_LIST_KEY, newShoppingList);
    setValue("");
  };

  const handleDelete = (id: string) => {
    const newShoppingList = [...shoppingList].filter((item) => item.id !== id);
    saveToStorage(SHOPPING_LIST_KEY, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = [...shoppingList].map((item) => {
      if (item.id === id) {
        if (item.completedAtTimeStamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return {
          ...item,
          completedAtTimeStamp: item.completedAtTimeStamp
            ? undefined
            : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
      }
      return item;
    });
    saveToStorage(SHOPPING_LIST_KEY, newShoppingList);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      // keyExtractor={} // in case we don't have the id
      data={orderShoppingListItem(shoppingList)}
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
