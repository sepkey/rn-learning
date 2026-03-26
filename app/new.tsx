/* eslint-disable prettier/prettier */
import BusinessButton from "@/components/business-button";
import BusinessImage from "@/components/business-image";
import { theme } from "@/theme";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function New() {
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }
    if (!days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to be watered?`
      );
    }
    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a number"
      );
    }
    console.log(name, days, "inputs");
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centered}>
        <BusinessImage />
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        placeholder="E.g. Casper the Cactus"
        style={styles.input}
        onChangeText={setName}
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        value={days}
        placeholder="E.g. 6"
        style={styles.input}
        onChangeText={setDays}
        keyboardType="number-pad"
        autoCapitalize="words"
      />
      <BusinessButton title="Add plant" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderColor: theme.colorLightGray,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
  },
});
