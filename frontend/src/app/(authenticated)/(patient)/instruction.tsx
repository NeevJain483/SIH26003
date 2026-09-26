import {
  ArrowLeft,
  Layers3,
  Play,
  Volume2,
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

import { gameCatalog } from "@/data/games";
import { colors } from "@/theme/colors";

export default function InstructionsScreen() {
  const { gameId } =
    useLocalSearchParams<{
      gameId?: string;
    }>();

  const game =
    gameCatalog.find(
      (item) => item.id === gameId
    ) ?? gameCatalog[0];

  const startGame = () => {
    router.push({
      pathname:
        "/(authenticated)/(patient)/game",
      params: {
        gameId: game.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft
            size={22}
            color={colors.text}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Instructions
        </Text>

        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Layers3
            size={32}
            color={colors.coral}
          />
        </View>

        <Text style={styles.kicker}>
          GET READY
        </Text>

        <Text style={styles.title}>
          {game.title}
        </Text>

        <Text style={styles.description}>
          {game.description}
        </Text>

        <View style={styles.instructionCard}>
          <Text style={styles.cardTitle}>
            How to play
          </Text>

          <InstructionRow
            number="1"
            text="Look carefully at each item."
          />

          <InstructionRow
            number="2"
            text="Remember the order or pattern."
          />

          <InstructionRow
            number="3"
            text="Select your answer when you're ready."
          />
        </View>

        <Pressable
          style={styles.voiceButton}
          onPress={() =>
            console.log("Voice instructions")
          }
        >
          <Volume2
            size={20}
            color={colors.coral}
          />

          <Text style={styles.voiceText}>
            Listen to instructions
          </Text>
        </Pressable>

        <Pressable
          style={styles.startButton}
          onPress={startGame}
        >
          <Play
            size={19}
            color="#FFFFFF"
            fill="#FFFFFF"
          />

          <Text style={styles.startText}>
            Start Game
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function InstructionRow({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <View style={styles.instructionRow}>
      <View style={styles.number}>
        <Text style={styles.numberText}>
          {number}
        </Text>
      </View>

      <Text style={styles.instructionText}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  kicker: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.coral,
  },

  title: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },

  description: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
  },

  instructionCard: {
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 15,
  },

  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  number: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    fontWeight: "800",
    color: colors.coral,
  },

  instructionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },

  voiceButton: {
    marginTop: 15,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  voiceText: {
    marginLeft: 8,
    fontWeight: "700",
    color: colors.text,
  },

  startButton: {
    marginTop: 12,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.coral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  startText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});