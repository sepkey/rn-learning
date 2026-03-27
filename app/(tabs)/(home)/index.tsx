/* eslint-disable prettier/prettier */
import BusinessButton from "@/components/business-button";
import PlantCard from "@/components/plant-card";
import { Paths } from "@/paths";
import { usePlantsStore } from "@/store/plants-store";
import { theme } from "@/theme";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet } from "react-native";

export default function App() {
  const plants = usePlantsStore((state) => state.plants);
  const router = useRouter();
  return (
    <FlatList
      data={plants}
      renderItem={({ item }) => <PlantCard plant={item} />}
      ListEmptyComponent={() => (
        <BusinessButton
          title="Add your first plant!"
          onPress={() => router.navigate(Paths.New)}
        />
      )}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
  },
  contentContainer: { padding: 12 },
});
