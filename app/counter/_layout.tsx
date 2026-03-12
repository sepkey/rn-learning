import { MaterialIcons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { theme } from "../../theme";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => (
            <Link href="/counter/history">
              <MaterialIcons size={32} name="history" color={theme.colorGrey} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
