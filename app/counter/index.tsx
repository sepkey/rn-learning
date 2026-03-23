/* eslint-disable prettier/prettier */
import { Duration, intervalToDuration, isBefore } from "date-fns";
import * as Device from "expo-device";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  // useWindowDimensions,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import TimeSegment from "../../components/time-segment";
import useCountdownState, {
  COUNTDOWN_STORAGE_KEY,
  PersistedCountdownState,
} from "../../hooks/use-countdown-state";
import { theme } from "../../theme";
import { registerForPushNotification } from "../../utils/register-for-push-notification";
import { saveToStorage } from "../../utils/storage";

type CountdownType = {
  isOverdue: boolean;
  distance: Duration;
};

const frequency = 2 * 7 * 24 * 60 * 60 * 1000;

export default function CounterScreen() {
  // const { width,height } = useWindowDimensions();//the good thing is this way adapt responsive landscape or vertical portrait
  const { countdownState, setCountdownState } = useCountdownState();
  const [status, setStatus] = useState<CountdownType>({
    isOverdue: false,
    distance: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const confettiRef = useRef<ConfettiCannon>(null);

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
    confettiRef?.current?.start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        origin={{ x: Dimensions.get("window").width / 2, y: -20 }}
        fadeOut
        autoStart={false}
      />
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
