import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { ReactNode } from "react";

import { router } from "expo-router";

import {
  Bell,
  LogOut,
  User,
} from "lucide-react-native";

import { colors } from "@/theme/colors";
import { removeToken } from "@/utils/authStorage";

export default function CaregiverSettings() {
  const logout = async () => {
    await removeToken();

    router.dismissAll();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.kicker}>
          CAREGIVER MODE
        </Text>

        <Text style={styles.title}>
          Settings
        </Text>

        <Text style={styles.subtitle}>
          Manage your caregiver account.
        </Text>

        <View style={styles.card}>
          <SettingRow
            icon={
              <User
                size={21}
                color={colors.coral}
              />
            }
            title="My profile"
            subtitle="Manage caregiver information"
          />

          <SettingRow
            icon={
              <Bell
                size={21}
                color={colors.coral}
              />
            }
            title="Notifications"
            subtitle="Activity and reminder alerts"
          />
        </View>

        <Pressable
          style={styles.logout}
          onPress={logout}
        >
          <LogOut
            size={20}
            color={colors.danger}
          />

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function SettingRow({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        {icon}
      </View>

      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowSubtitle}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 110,
  },

  kicker: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.coral,
  },

  title: {
    marginTop: 7,
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: colors.muted,
  },

  card: {
    marginTop: 25,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  rowContent: {
    flex: 1,
    marginLeft: 13,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
  },

  rowSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
  },

  logout: {
    marginTop: 20,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFF1F1",
    borderWidth: 1,
    borderColor: "#FFD4D4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "800",
    color: colors.danger,
  },
});