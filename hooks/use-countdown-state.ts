import { useEffect, useState } from "react";
import { getFromStorage } from "../utils/storage";

export const COUNTDOWN_STORAGE_KEY = "taskly-countdown";

export type PersistedCountdownState = {
  currentNotificationId: string | undefined; // to be tracked for canceling
  completedAtTimestamps: number[]; //for history log
};
export default function useCountdownState() {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  useEffect(() => {
    const init = async () => {
      const initialCountdownState = await getFromStorage(COUNTDOWN_STORAGE_KEY);
      setCountdownState(initialCountdownState);
    };

    init();
  }, []);
  return { countdownState, setCountdownState };
}
