import {
  RefreshCw,
  Sparkles,
} from "lucide-react-native";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import { colors } from "@/theme/colors";

export default function ResultScreen() {
  const {
    score = "0",
    accuracy = "0",
    responseTime = "0",
    gameId = "memory-sequence",
  } = useLocalSearchParams<{
    score?: string;
    accuracy?: string;
    responseTime?: string;
    gameId?: string;
  }>();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sparkle}>
          ✦
        </Text>

        <Text style={styles.kicker}>
          ACTIVITY COMPLETE
        </Text>

        <Text style={styles.title}>
          Well remembered, Aita.
        </Text>

        <Text style={styles.description}>
          You gave yourself a quiet moment to
          focus. That matters.
        </Text>

        <View style={styles.score}>
          <Text style={styles.scoreNumber}>
            {score}
          </Text>

          <Text style={styles.points}>
            points
          </Text>
        </View>

        <View style={styles.details}>
          <Detail
            value={`${accuracy}%`}
            label="accuracy"
          />

          <Detail
            value={`${responseTime}s`}
            label="response time"
          />

          <Detail
            value="EASY"
            label="next level"
          />
        </View>

        <View style={styles.feedback}>
          <Sparkles
            size={20}
            color={colors.coral}
          />

          <Text style={styles.feedbackText}>
            Your next activity stays easy. The
            level changes gently from recent game
            performance, never as a medical
            measure.
          </Text>
        </View>

        <Pressable
          style={styles.primary}
          onPress={() =>
            router.replace({
              pathname:
                "/(authenticated)/(patient)/game",
              params: {
                gameId,
              },
            })
          }
        >
          <RefreshCw
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.primaryText}>
            Play again
          </Text>
        </Pressable>

        <Pressable
          style={styles.secondary}
          onPress={() =>
            router.push(
              "/(authenticated)/(patient)/progress"
            )
          }
        >
          <Text style={styles.secondaryText}>
            See my progress
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            router.replace(
              "/(authenticated)/(patient)/home"
            )
          }
        >
          <Text style={styles.home}>
            Back home
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function Detail({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <View style={styles.detail}>
      <Text style={styles.detailValue}>
        {value}
      </Text>

      <Text style={styles.detailLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    padding: 25,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: "center",
  },

  sparkle: {
    fontSize: 35,
    color: colors.coral,
  },

  kicker: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.coral,
  },

  title: {
    marginTop: 8,
    fontSize: 28,
    textAlign: "center",
    fontWeight: "800",
    color: colors.text,
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: colors.muted,
  },

  score: {
    marginTop: 25,
    alignItems: "center",
  },

  scoreNumber: {
    fontSize: 58,
    fontWeight: "900",
    color: colors.coral,
  },

  points: {
    marginTop: -5,
    color: colors.muted,
  },

  details: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },

  detail: {
    alignItems: "center",
  },

  detailValue: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },

  detailLabel: {
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },

  feedback: {
    marginTop: 24,
    padding: 15,
    borderRadius: 15,
    backgroundColor: colors.coralLight,
    flexDirection: "row",
  },

  feedbackText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 12,
    lineHeight: 18,
    color: colors.text,
  },

  primary: {
    width: "100%",
    marginTop: 24,
    minHeight: 50,
    borderRadius: 15,
    backgroundColor: colors.coral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    marginLeft: 7,
    color: "#FFFFFF",
    fontWeight: "800",
  },

  secondary: {
    width: "100%",
    marginTop: 10,
    minHeight: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    fontWeight: "700",
    color: colors.text,
  },

  home: {
    marginTop: 16,
    fontWeight: "700",
    color: colors.coral,
  },
});