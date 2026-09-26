import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";

import { Brain, ChevronRight, Heart, Play } from "lucide-react-native";

import OfflinePill from "@/components/common/OfflinePill";
import { colors } from "@/theme/colors";

export default function PatientHome() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.kicker}>PATIENT MODE</Text>

            <Text style={styles.title}>Welcome 👋</Text>

            <Text style={styles.subtitle}>
              {"Let's"}keep your mind active today.
            </Text>
          </View>

          <OfflinePill />
        </View>

        {/* Start activity */}

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Brain size={30} color={colors.coral} />
          </View>

          <Text style={styles.heroTitle}>Ready for {"today's activity?"}</Text>

          <Text style={styles.heroText}>
            Take a short memory activity using familiar objects, places and
            everyday experiences.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              router.push({
                pathname: "/(authenticated)/(patient)/instruction",
                params: {
                  gameId: "memory-sequence",
                },
              })
            }
          >
            <Play size={19} color="#FFFFFF" fill="#FFFFFF" />

            <Text style={styles.startButtonText}>Start Activity</Text>
          </Pressable>
        </View>

        {/* Reminder */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{"Today's"} reminder</Text>

          <View style={styles.reminderCard}>
            <View style={styles.reminderIcon}>
              <Heart size={20} color={colors.coral} />
            </View>

            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>Stay hydrated</Text>

              <Text style={styles.reminderText}>
                Remember to drink some water.
              </Text>
            </View>
          </View>
        </View>

        {/* Progress */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your progress</Text>

          <Pressable
            style={styles.menuCard}
            onPress={() => router.push("/(authenticated)/(patient)/progress")}
          >
            <View style={styles.menuIcon}>
              <Brain size={22} color={colors.coral} />
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>View your progress</Text>

              <Text style={styles.menuText}>
                See your recent activity and performance.
              </Text>
            </View>

            <ChevronRight size={20} color={colors.muted} />
          </Pressable>
        </View>
      </ScrollView>
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
    marginBottom: 25,
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

  heroCard: {
    padding: 22,
    borderRadius: 24,
    backgroundColor: colors.white,
  },

  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },

  heroText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
  },

  startButton: {
    marginTop: 20,
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.coral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  startButtonText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  pressed: {
    opacity: 0.8,
  },

  section: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 12,
  },

  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    borderRadius: 18,
    backgroundColor: colors.white,
  },

  reminderIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  reminderContent: {
    flex: 1,
    marginLeft: 12,
  },

  reminderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text,
  },

  reminderText: {
    marginTop: 4,
    fontSize: 13,
    color: colors.muted,
  },

  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 17,
    borderRadius: 18,
    backgroundColor: colors.white,
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
    lineHeight: 18,
    color: colors.muted,
  },
});
