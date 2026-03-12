import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { theme } from "../../theme";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => (
            <Link href="/counter/history" asChild>
              <Pressable hitSlop={20}>
                <MaterialIcons
                  size={32}
                  name="history"
                  color={theme.colorGrey}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
