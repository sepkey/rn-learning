import { ShoppingListItemType } from "../app";

export const orderShoppingListItem = function (
  shoppingList: ShoppingListItemType[]
) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
      return item2.completedAtTimeStamp - item1.completedAtTimeStamp;
    }
    if (item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
      return 1;
    }
    if (!item1.completedAtTimeStamp && item2.completedAtTimeStamp) {
      return -1;
    }

    if (!item1.completedAtTimeStamp && !item2.completedAtTimeStamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
};
