import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Shopping List" }} />
      <Tabs.Screen name="counter" options={{ title: "Counter" }} />
      <Tabs.Screen name="idea" options={{ title: "Idea" }} />
    </Tabs>
  );
}
