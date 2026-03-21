import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotification } from "../../utils/register-for-push-notification";

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const result = await registerForPushNotification();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: { title: "I'm a notification from your app" },
        trigger: { seconds: 5 },
      });
    } else {
      if (Device.isDevice)
        Alert.alert(
          "Unable to schedule notification.",
          "Enable the notification permission for Expo Go in settings."
        );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={scheduleNotification}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Schedule notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold", // on android passing the number will cause the app to be crashed
    fontSize: 24,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
