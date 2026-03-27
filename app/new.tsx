/* eslint-disable prettier/prettier */
import BusinessButton from "@/components/business-button";
import BusinessImage from "@/components/business-image";
import { Paths } from "@/paths";
import { usePlantsStore } from "@/store/plants-store";
import { theme } from "@/theme";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function New() {
  const [imageUri, setImageUri] = useState<string>();
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();
  const addPlant = usePlantsStore((state) => state.addPlant);
  const router = useRouter();

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
    addPlant({ name, wateringFrequencyDays: parseInt(days) });
    router.navigate(Paths.Home);
  };

  const handleChooseImage = async () => {
    if (Platform.OS === "web") return;
    const result = await ImagePicker.lauchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        style={styles.centered}
        activeOpacity={0.8}
        onPress={handleChooseImage}
      >
        <BusinessImage imageUri={imageUri} />
      </TouchableOpacity>
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colorWhite,
    flex: 1,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
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
