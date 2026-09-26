import {
  LockKeyhole,
} from "lucide-react-native";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import OfflinePill from "@/components/common/OfflinePill";
import GameCard from "@/components/games/GameCard";

import { gameCatalog } from "@/data/games";
import { colors } from "@/theme/colors";

export default function GamesScreen() {
  const handleGamePress = (
    game: (typeof gameCatalog)[number]
  ) => {
    if (!game.playable) {
      return;
    }

    router.push({
      pathname:
        "/(authenticated)/(patient)/instruction",
      params: {
        gameId: game.id,
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heading}>
        <View style={styles.headingText}>
          <Text style={styles.kicker}>
            PATIENT MODE
          </Text>

          <Text style={styles.title}>
            Choose an activity
          </Text>

          <Text style={styles.subtitle}>
            Familiar things make good memories easier to
            reach.
          </Text>
        </View>

        <OfflinePill />
      </View>

      <View style={styles.list}>
        {gameCatalog.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            tag={game.tag}
            description={game.description}
            playable={game.playable}
            emoji={
              game.id === "memory-sequence"
                ? "🧠"
                : game.id === "sounds-home"
                  ? "🔊"
                  : game.id === "colours-crafts"
                    ? "🎨"
                    : "📍"
            }
            onPress={() =>
              handleGamePress(game)
            }
          />
        ))}
      </View>

      <View style={styles.privacy}>
        <LockKeyhole
          size={19}
          color={colors.muted}
        />

        <Text style={styles.privacyText}>
          <Text style={styles.bold}>
            Made for gentle practice{"\n"}
          </Text>

          Activities show game performance only.
          SmritiSetu does not diagnose, measure dementia
          severity or provide medical treatment.
        </Text>
      </View>
    </ScrollView>
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

  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
  },

  headingText: {
    flex: 1,
    paddingRight: 15,
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
    marginTop: 7,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
  },

  list: {
    marginTop: 5,
  },

  privacy: {
    marginTop: 15,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#EEF1F5",
    flexDirection: "row",
  },

  privacyText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
    lineHeight: 19,
    color: colors.muted,
  },

  bold: {
    fontWeight: "800",
    color: colors.text,
  },
});