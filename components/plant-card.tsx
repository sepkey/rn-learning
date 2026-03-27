import { Paths } from "@/paths";
import { PlantType } from "@/store/plants-store";
import { theme } from "@/theme";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BusinessImage from "./business-image";

export default function PlantCard({ plant }: { plant: PlantType }) {
  return (
    <Link href={Paths.Plant(plant.id)} asChild>
      <Pressable style={styles.plantCard}>
        <BusinessImage size={100} imageUri={plant.imageUri} />
        <View style={styles.details}>
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.subtitle}>
            Water every {plant.wateringFrequencyDays}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  plantCard: {
    flexDirection: "row",
    shadowColor: theme.colorBlack,
    backgroundColor: theme.colorLightGray,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    shadowOffset: {
      //ios
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, //android
  },
  details: { padding: 14, justifyContent: "center" },
  plantName: { fontSize: 18, marginBottom: 4 },
  subtitle: { color: theme.colorGray },
});
