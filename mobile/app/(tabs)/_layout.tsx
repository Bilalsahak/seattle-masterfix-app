import { SymbolView } from "expo-symbols";
import { Tabs } from "expo-router";
import { colors } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.bronzeDeep,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          height: 70,
          backgroundColor: colors.paper,
          borderTopColor: colors.border,
          paddingTop: 8,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: "house.fill", android: "home", web: "home" }} tintColor={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: "hammer.fill", android: "construction", web: "build" }} tintColor={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="estimate"
        options={{
          title: "Estimate",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: "square.and.pencil", android: "edit", web: "edit" }} tintColor={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: "ellipsis", android: "more_horiz", web: "more_horiz" }} tintColor={color} size={22} />
          ),
        }}
      />
    </Tabs>
  );
}
