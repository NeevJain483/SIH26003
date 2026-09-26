import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import {
  ArrowLeft,
  Brain,
  Calendar,
  ChevronRight,
  TrendingUp,
} from "lucide-react-native";

import { colors } from "@/theme/colors";

export default function PatientDetails() {
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={22} color={colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>Patient</Text>

          <View style={{ width: 44 }} />
        </View>

        {/* Patient profile */}

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <Text style={styles.name}>Aita</Text>

          <Text style={styles.id}>Patient ID: {id}</Text>

          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>

        {/* Summary */}

        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.stats}>
          <Stat value="12" label="Activities" />

          <Stat value="84%" label="Accuracy" />

          <Stat value="7" label="Active days" />
        </View>

        {/* Progress */}

        <Pressable
          style={styles.menuCard}
          onPress={() =>
            router.push({
              pathname: "/(authenticated)/(caregiver)/progress",
              params: {
                patientId: id ?? "demo-patient",
              },
            })
          }
        >
          <View style={styles.menuIcon}>
            <TrendingUp size={22} color={colors.coral} />
          </View>

          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>View progress</Text>

            <Text style={styles.menuText}>
              See recent activity performance.
            </Text>
          </View>

          <ChevronRight size={20} color={colors.muted} />
        </Pressable>

        {/* Games */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent activities</Text>

          <Activity
            title="Memory Sequence"
            accuracy="84%"
            date="Today, 10:42 AM"
          />

          <Activity
            title="Sounds of Home"
            accuracy="91%"
            date="Today, 09:15 AM"
          />

          <Activity
            title="Places I Remember"
            accuracy="76%"
            date="Yesterday, 06:30 PM"
          />
        </View>

        {/* Reminders */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Reminders</Text>

            <Calendar size={20} color={colors.coral} />
          </View>

          <Text style={styles.reminder}>💧 Drink water</Text>

          <Text style={styles.reminder}>💊 Take medicine</Text>

          <Text style={styles.reminder}>🧠 Complete {"today's"} activity</Text>
        </View>

        <View style={styles.note}>
          <Brain size={20} color={colors.coral} />

          <Text style={styles.noteText}>
            Game performance is intended for activity monitoring and should not
            be interpreted as a medical diagnosis.
          </Text>
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

function Activity({
  title,
  accuracy,
  date,
}: {
  title: string;
  accuracy: string;
  date: string;
}) {
  return (
    <View style={styles.activity}>
      <View style={styles.activityIcon}>
        <Brain size={18} color={colors.coral} />
      </View>

      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>

        <Text style={styles.activityDate}>{date}</Text>
      </View>

      <Text style={styles.activityAccuracy}>{accuracy}</Text>
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
    paddingBottom: 110,
  },

  header: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },

  profileCard: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: "center",
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.coral,
  },

  name: {
    marginTop: 12,
    fontSize: 23,
    fontWeight: "800",
    color: colors.text,
  },

  id: {
    marginTop: 5,
    fontSize: 12,
    color: colors.muted,
  },

  activeBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.leafLight,
  },

  activeText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.success,
  },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },

  stats: {
    flexDirection: "row",
    gap: 10,
  },

  stat: {
    flex: 1,
    padding: 15,
    borderRadius: 18,
    backgroundColor: colors.white,
  },

  statValue: {
    fontSize: 23,
    fontWeight: "900",
    color: colors.coral,
  },

  statLabel: {
    marginTop: 4,
    fontSize: 11,
    color: colors.muted,
  },

  menuCard: {
    marginTop: 18,
    padding: 17,
    borderRadius: 20,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  menuContent: {
    flex: 1,
    marginHorizontal: 12,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
  },

  menuText: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
  },

  card: {
    marginTop: 18,
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 12,
  },

  activity: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  activityIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  activityContent: {
    flex: 1,
    marginLeft: 10,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  activityDate: {
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },

  activityAccuracy: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.success,
  },

  reminder: {
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },

  note: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.coralLight,
    flexDirection: "row",
  },

  noteText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },
});
