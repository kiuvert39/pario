import { Tabs } from "expo-router";

import { BottomNav } from "@/components/ui/bottom-nav";

export default function MainLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{ headerShown: false, lazy: false }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="portfolio" />
      <Tabs.Screen name="exchange" />
      <Tabs.Screen name="markets" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
