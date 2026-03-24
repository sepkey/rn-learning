import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "tabs",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          title: "Onboarding",
        }}
      />
    </Stack>
  );
}
