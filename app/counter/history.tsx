import { format } from "date-fns";
import { FlatList, StyleSheet, Text, View } from "react-native";
import useCountdownState from "../../components/hooks/use-countdown-state";
import { theme } from "../../theme";

const fullDateFormat = "LLL d yyy, h:mm aaa";

export default function HistoryScreen() {
  const { countdownState } = useCountdownState();
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={countdownState?.completedAtTimestamps}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.listEmptyContainer}>
          <Text>No history.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: theme.colorWhite },
  contentContainer: { marginTop: 8 },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
  listItem: {
    backgroundColor: theme.colorLightGrey,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 18,
  },
});
