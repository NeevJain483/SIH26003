import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import {
  Globe,
  LogOut,
  RefreshCw,
  User,
} from "lucide-react-native";

import { colors } from "@/theme/colors";
import { removeToken } from "@/utils/authStorage";

export default function PatientSettings() {
  const handleLogout = async () => {
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
          PATIENT MODE
        </Text>

        <Text style={styles.title}>
          Settings
        </Text>

        <Text style={styles.subtitle}>
          Manage your preferences.
        </Text>

        <View style={styles.card}>
          <SettingRow
            icon={<User size={21} color={colors.coral} />}
            title="My profile"
            subtitle="View your account information"
          />

          <SettingRow
            icon={
              <Globe
                size={21}
                color={colors.coral}
              />
            }
            title="Language"
            subtitle="English"
          />

          <SettingRow
            icon={
              <RefreshCw
                size={21}
                color={colors.coral}
              />
            }
            title="Sync"
            subtitle="Manage offline data synchronization"
            onPress={() =>
              router.push(
                "/(authenticated)/(patient)/sync"
              )
            }
          />
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogout}
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
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
    >
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
    </Pressable>
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
    color: colors.muted,
    fontSize: 14,
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

  logoutButton: {
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