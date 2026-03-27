import { Paths } from "@/paths";
import { useUserStore } from "@/store/user-store";
import { theme } from "@/theme";
import { Entypo, Feather } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function Layout() {
  const hasFinishedOnboarding = useUserStore(
    // eslint-disable-next-line prettier/prettier
    (state) => state.hasFinishedOnboarding
  );

  if (!hasFinishedOnboarding) {
    return <Redirect href={Paths.Onboarding} />;
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
