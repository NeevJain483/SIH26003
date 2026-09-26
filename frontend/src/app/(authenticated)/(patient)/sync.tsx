import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";

import {
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  WifiOff,
} from "lucide-react-native";

import { colors } from "@/theme/colors";

export default function Sync() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ArrowLeft
            size={24}
            color={colors.text}
            onPress={() => router.back()}
          />

          <Text style={styles.title}>Sync Center</Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.statusCard}>
          <View style={styles.iconCircle}>
            <CheckCircle2 size={32} color={colors.success} />
          </View>

          <Text style={styles.statusTitle}>Everything is synced</Text>

          <Text style={styles.statusText}>
            Your latest activities and progress have been synchronized.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sync information</Text>

          <InfoRow label="Status" value="Online" />

          <InfoRow label="Last sync" value="Today, 10:42 AM" />

          <InfoRow label="Activities synced" value="12" />

          <InfoRow label="Pending items" value="0" />
        </View>

        <PressSyncButton />

        <View style={styles.offlineCard}>
          <WifiOff size={24} color={colors.mustard} />

          <View style={styles.offlineText}>
            <Text style={styles.offlineTitle}>Offline ready</Text>

            <Text style={styles.offlineDescription}>
              Activities can continue when there is no internet connection. Data
              can be synchronized when connectivity returns.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function PressSyncButton() {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.syncButton,
        pressed && styles.syncButtonPressed,
      ]}
      onPress={() => {
        console.log("Sync started");
      }}
    >
      <RefreshCw size={18} color="#FFFFFF" />

      <Text style={styles.syncButtonText}>Sync Now</Text>
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
    paddingBottom: 110,
  },

  header: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
  },

  statusCard: {
    backgroundColor: colors.coralLight,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  statusTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },

  statusText: {
    color: colors.muted,
    textAlign: "center",
    lineHeight: 21,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  label: {
    color: colors.muted,
    fontSize: 14,
  },

  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },

  syncButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.coral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  syncButtonText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontWeight: "800",
  },

  offlineCard: {
    flexDirection: "row",
    backgroundColor: colors.mustardLight,
    borderRadius: 18,
    padding: 18,
    marginTop: 20,
  },

  offlineText: {
    flex: 1,
    marginLeft: 12,
  },

  offlineTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 5,
  },

  offlineDescription: {
    color: colors.muted,
    lineHeight: 20,
    fontSize: 13,
  },
  syncButtonPressed: {
    opacity: 0.8,
  },
});
