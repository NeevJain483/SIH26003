import { Tabs } from "expo-router";
import { Home, Plus, Settings } from "lucide-react-native";

import { colors } from "@/theme/colors";

export default function CaregiverLayout() {
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
        name="add-patient"
        options={{
          title: "Add Patient",
          tabBarIcon: ({ color, size }) => (
            <Plus size={size} color={color} />
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

      <Tabs.Screen
        name="progress"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="patient/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}