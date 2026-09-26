import { Activity, ChevronRight, Plus, WifiOff } from "lucide-react-native";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";

import { colors } from "@/theme/colors";

export default function CaregiverHome() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.kicker}>CAREGIVER MODE</Text>

            <Text style={styles.title}>Dashboard</Text>

            <Text style={styles.subtitle}>
              Monitor your connected {"patient's"}
              activities.
            </Text>
          </View>

          <View style={styles.offlinePill}>
            <WifiOff size={14} color={colors.muted} />

            <Text style={styles.offlineText}>Online</Text>
          </View>
        </View>

        {/* Patient */}

        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.patientLabel}>CONNECTED PATIENT</Text>

            <Text style={styles.patientName}>Aita</Text>

            <Text style={styles.patientStatus}>Active today</Text>
          </View>

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(authenticated)/(caregiver)/patient/[id]",
                params: {
                  id: "demo-patient",
                },
              })
            }
          >
            <ChevronRight size={22} color={colors.muted} />
          </Pressable>
        </View>

        {/* Stats */}

        <Text style={styles.sectionTitle}>{"Today's"} overview</Text>

        <View style={styles.stats}>
          <Stat value="3" label="Activities" />

          <Stat value="84%" label="Accuracy" />

          <Stat value="12m" label="Active time" />
        </View>

        {/* Recent activity */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent activity</Text>

          <Pressable
            onPress={() => router.push("/(authenticated)/(caregiver)/progress")}
          >
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>

        <View style={styles.activityCard}>
          <ActivityRow
            title="Memory Sequence"
            time="Today, 10:42 AM"
            accuracy="84%"
          />

          <ActivityRow
            title="Sounds of Home"
            time="Today, 09:15 AM"
            accuracy="91%"
          />

          <ActivityRow
            title="Places I Remember"
            time="Yesterday, 06:30 PM"
            accuracy="76%"
          />
        </View>

        {/* Add patient */}

        <Pressable
          style={styles.addCard}
          onPress={() =>
            router.push("/(authenticated)/(caregiver)/add-patient")
          }
        >
          <View style={styles.addIcon}>
            <Plus size={22} color={colors.coral} />
          </View>

          <View style={styles.addContent}>
            <Text style={styles.addTitle}>Add another patient</Text>

            <Text style={styles.addText}>
              Connect another patient to your caregiver account.
            </Text>
          </View>

          <ChevronRight size={20} color={colors.muted} />
        </Pressable>

        {/* Note */}

        <View style={styles.note}>
          <Activity size={20} color={colors.coral} />

          <View style={styles.noteContent}>
            <Text style={styles.noteTitle}>Gentle monitoring</Text>

            <Text style={styles.noteText}>
              Activity results describe game performance and are not a medical
              diagnosis.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ActivityRow({
  title,
  time,
  accuracy,
}: {
  title: string;
  time: string;
  accuracy: string;
}) {
  return (
    <View style={styles.activityRow}>
      <View style={styles.activityIcon}>
        <Activity size={18} color={colors.success} />
      </View>

      <View style={styles.activityInfo}>
        <Text style={styles.activityTitle}>{title}</Text>

        <Text style={styles.activityTime}>{time}</Text>
      </View>

      <Text style={styles.accuracy}>{accuracy}</Text>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  headerText: {
    flex: 1,
    paddingRight: 12,
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
    lineHeight: 21,
    color: colors.muted,
  },

  offlinePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  offlineText: {
    marginLeft: 5,
    fontSize: 11,
    color: colors.muted,
  },

  patientCard: {
    marginTop: 25,
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.coral,
  },

  patientInfo: {
    flex: 1,
    marginLeft: 13,
  },

  patientLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    color: colors.coral,
  },

  patientName: {
    marginTop: 4,
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
  },

  patientStatus: {
    marginTop: 3,
    fontSize: 12,
    color: colors.success,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },

  stats: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  stat: {
    flex: 1,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.white,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.coral,
  },

  statLabel: {
    marginTop: 5,
    fontSize: 11,
    color: colors.muted,
  },

  sectionHeader: {
    marginTop: 28,
    marginBottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  viewAll: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.coral,
  },

  activityCard: {
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  activityRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  activityIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.leafLight,
    alignItems: "center",
    justifyContent: "center",
  },

  activityInfo: {
    flex: 1,
    marginLeft: 11,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  activityTime: {
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },

  accuracy: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.success,
  },

  addCard: {
    marginTop: 18,
    padding: 17,
    borderRadius: 20,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  addIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  addContent: {
    flex: 1,
    marginHorizontal: 12,
  },

  addTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
  },

  addText: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },

  note: {
    marginTop: 20,
    padding: 17,
    borderRadius: 18,
    backgroundColor: colors.coralLight,
    flexDirection: "row",
  },

  noteContent: {
    flex: 1,
    marginLeft: 10,
  },

  noteTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text,
  },

  noteText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },
});
