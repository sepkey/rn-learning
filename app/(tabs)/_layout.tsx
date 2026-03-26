import { useUserStore } from "@/store/user-store";
import { theme } from "@/theme";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

export default function Layout() {
  const hasFinishedOnboarding = useUserStore(
    // eslint-disable-next-line prettier/prettier
    (state) => state.hasFinishedOnboarding
  );

  if (!hasFinishedOnboarding) {
    return <Redirect href="/onboarding" />;
  }
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorGreen }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" color={color} size={size} />
          ),
          headerRight: () => (
            <Link href={"/new"} asChild>
              <Pressable style={{ marginRight: 18 }} hitSlop={20}>
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={theme.colorGreen}
                />
              </Pressable>
            </Link>
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
