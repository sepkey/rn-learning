/* eslint-disable prettier/prettier */
import { Duration, intervalToDuration, isBefore } from "date-fns";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useCountdownState, {
  COUNTDOWN_STORAGE_KEY,
  PersistedCountdownState,
} from "../../components/hooks/use-countdown-state";
import TimeSegment from "../../components/time-segment";
import { theme } from "../../theme";
import { registerForPushNotification } from "../../utils/register-for-push-notification";
import { saveToStorage } from "../../utils/storage";

type CountdownType = {
  isOverdue: boolean;
  distance: Duration;
};

const frequency = 10 * 1000;

export default function CounterScreen() {
  const { countdownState, setCountdownState } = useCountdownState();
  const [status, setStatus] = useState<CountdownType>({
    isOverdue: false,
    distance: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  const lastCompletedAtTimestamp = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timestamp = lastCompletedAtTimestamp
        ? lastCompletedAtTimestamp + frequency
        : Date.now();

      if (lastCompletedAtTimestamp) {
        setIsLoading(false);
      }
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp }
      );
      setStatus({ distance, isOverdue });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastCompletedAtTimestamp]);

  const scheduleNotification = async () => {
    let pushNotificationId;
    const result = await registerForPushNotification();
    if (result === "granted") {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: { title: "It's change color time" },
        trigger: { seconds: frequency / 1000 },
      });
    } else {
      if (Device.isDevice)
        Alert.alert(
          "Unable to schedule notification.",
          "Enable the notification permission for Expo Go in settings."
        );
    }

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState?.currentNotificationId
      );
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };

    setCountdownState(newCountdownState);
    await saveToStorage(COUNTDOWN_STORAGE_KEY, newCountdownState);
  };

  if (countdownState?.currentNotificationId && isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
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
    backgroundColor: theme.colorWhite,
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
