import { Tabs } from "expo-router";
import { Gamepad2, Home, Settings } from "lucide-react-native";

import { colors } from "@/theme/colors";

export default function PatientLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: colors.coral,
        tabBarInactiveTintColor: colors.muted,

        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color, size }) => (
            <Gamepad2 size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />

      {/* Screens that should NOT appear in bottom navigation */}

      <Tabs.Screen
        name="progress"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="instruction"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="game"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="result"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="sync"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}