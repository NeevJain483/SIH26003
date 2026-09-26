import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import {
  ArrowLeft,
  TrendingUp,
} from "lucide-react-native";

import { colors } from "@/theme/colors";

export default function CaregiverProgress() {
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

          <Text style={styles.title}>
            Patient Progress
          </Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              A
            </Text>
          </View>

          <View>
            <Text style={styles.patientName}>
              Aita
            </Text>

            <Text style={styles.patientStatus}>
              Connected patient
            </Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <TrendingUp
              size={30}
              color={colors.coral}
            />
          </View>

          <Text style={styles.heroTitle}>
            Activity overview
          </Text>

          <Text style={styles.heroText}>
            Recent game performance and activity
            information.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            This week
          </Text>

          <View style={styles.stats}>
            <Stat
              value="12"
              label="Activities"
            />

            <Stat
              value="84%"
              label="Accuracy"
            />

            <Stat
              value="7"
              label="Active days"
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Game performance
          </Text>

          <ProgressRow
            name="Memory Sequence"
            score={84}
          />

          <ProgressRow
            name="Sounds of Home"
            score={91}
          />

          <ProgressRow
            name="Places I Remember"
            score={76}
          />
        </View>

        <View style={styles.note}>
          <Text style={styles.noteTitle}>
            Important
          </Text>

          <Text style={styles.noteText}>
            These results describe performance in
            activities. They are not a medical
            diagnosis or measurement of dementia
            severity.
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
    <View>
      <Text style={styles.statValue}>
        {value}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

function ProgressRow({
  name,
  score,
}: {
  name: string;
  score: number;
}) {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.gameName}>
          {name}
        </Text>

        <Text style={styles.score}>
          {score}%
        </Text>
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

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },

  patientCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.coral,
  },

  patientName: {
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },

  patientStatus: {
    marginLeft: 12,
    marginTop: 3,
    fontSize: 12,
    color: colors.muted,
  },

  hero: {
    backgroundColor: colors.coralLight,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 18,
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

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },

  heroText: {
    marginTop: 7,
    textAlign: "center",
    color: colors.muted,
    lineHeight: 21,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
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
    justifyContent: "space-between",
  },

  statValue: {
    fontSize: 25,
    fontWeight: "900",
    color: colors.coral,
  },

  statLabel: {
    marginTop: 5,
    fontSize: 12,
    color: colors.muted,
  },

  progressContainer: {
    marginTop: 15,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  gameName: {
    fontSize: 14,
    fontWeight: "600",
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
    backgroundColor: colors.coral,
    borderRadius: 10,
  },

  note: {
    padding: 17,
    borderRadius: 18,
    backgroundColor: colors.coralLight,
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