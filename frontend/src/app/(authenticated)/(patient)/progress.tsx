import {
  ArrowLeft,
  Brain,
  TrendingUp,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import { colors } from "@/theme/colors";

export default function PatientProgress() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={22} color={colors.text} />
          </Pressable>

          <Text style={styles.headerTitle}>My Progress</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <TrendingUp size={30} color={colors.coral} />
          </View>

          <Text style={styles.heroTitle}>Keep going gently</Text>

          <Text style={styles.heroText}>
            Your activity performance is improving through
            regular practice.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week</Text>

          <View style={styles.stats}>
            <Stat value="12" label="Activities" />
            <Stat value="84%" label="Accuracy" />
            <Stat value="7" label="Active days" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity performance</Text>

          <ProgressRow
            title="Memory Sequence"
            score={84}
          />

          <ProgressRow
            title="Sounds of Home"
            score={91}
          />

          <ProgressRow
            title="Places I Remember"
            score={76}
          />
        </View>

        <View style={styles.note}>
          <Brain size={20} color={colors.coral} />

          <Text style={styles.noteText}>
            These results describe game performance only.
            They are not a medical diagnosis or measurement
            of dementia severity.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProgressRow({
  title,
  score,
}: {
  title: string;
  score: number;
}) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>{title}</Text>

        <Text style={styles.score}>{score}%</Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${score}%`,
            },
          ]}
        />
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
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },

  headerSpacer: {
    width: 44,
  },

  hero: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: colors.coralLight,
    alignItems: "center",
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },

  heroText: {
    marginTop: 7,
    textAlign: "center",
    lineHeight: 21,
    color: colors.muted,
  },

  card: {
    marginTop: 18,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 18,
  },

  stats: {
    flexDirection: "row",
    gap: 10,
  },

  stat: {
    flex: 1,
  },

  statValue: {
    fontSize: 25,
    fontWeight: "900",
    color: colors.coral,
  },

  statLabel: {
    marginTop: 5,
    fontSize: 11,
    color: colors.muted,
  },

  progressRow: {
    marginTop: 14,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  score: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.coral,
  },

  progressBackground: {
    height: 9,
    borderRadius: 10,
    backgroundColor: colors.border,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: colors.coral,
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