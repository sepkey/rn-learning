import { Duration, intervalToDuration, isBefore } from "date-fns";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TimeSegment from "../../components/time-segment";
import { theme } from "../../theme";
import { registerForPushNotification } from "../../utils/register-for-push-notification";

type CountdownType = {
  isOverdue: boolean;
  distance: Duration;
};

const timeStamp = Date.now() + 10 * 1000;

export default function CounterScreen() {
  const [status, setStatus] = useState<CountdownType>({
    isOverdue: false,
    distance: {},
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timeStamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timeStamp, end: Date.now() }
          : { start: Date.now(), end: timeStamp }
      );
      setStatus({ distance, isOverdue });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {status.isOverdue ? (
        <Text
          style={[
            styles.heading,
            status.isOverdue ? styles.textWhite : undefined,
          ]}
        >
          Washing the car overdue by
        </Text>
      ) : (
        <Text style={styles.heading}>Washing the car is in...</Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          number={status.distance.days ?? 0}
          unit="Days"
          textStyle={status.isOverdue ? styles.textWhite : undefined}
        />
        <TimeSegment
          number={status.distance.hours ?? 0}
          unit="Hours"
          textStyle={status.isOverdue ? styles.textWhite : undefined}
        />
        <TimeSegment
          number={status.distance.minutes ?? 0}
          unit="Minutes"
          textStyle={status.isOverdue ? styles.textWhite : undefined}
        />
        <TimeSegment
          number={status.distance.seconds ?? 0}
          unit="Seconds"
          textStyle={status.isOverdue ? styles.textWhite : undefined}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={scheduleNotification}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          I&apos;ve done the washing the car
        </Text>
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
  containerLate: {
    backgroundColor: theme.colorRed,
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
  row: { flexDirection: "row", marginBottom: 24 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  textWhite: {
    color: theme.colorWhite,
  },
});
