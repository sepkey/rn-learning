import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import ShoppingListItem from "../components/shopping-list-item";
import { Paths } from "../paths";
import { theme } from "../theme";

export default function App() {
  return (
    <View style={styles.container}>
      <Link
        href={Paths.Idea}
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to idea
      </Link>
      <Link
        href={Paths.Counter}
        style={{ textAlign: "center", marginBottom: 18, fontSize: 24 }}
      >
        Go to counter
      </Link>
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
    justifyContent: "center",
  },
});
