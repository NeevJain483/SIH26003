import { ArrowLeft, Check, RotateCcw } from "lucide-react-native";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useState } from "react";

import { sequenceRounds } from "@/utils/sequenceRounds";
import { colors } from "@/theme/colors";

export default function GameScreen() {
  const { gameId = "memory-sequence" } = useLocalSearchParams<{
    gameId?: string;
  }>();

  const round = sequenceRounds[0];

  const [shuffledItems] = useState(() => {
    return [...round.items].sort(() => Math.random() - 0.5);
  });

  const [selected, setSelected] = useState<string[]>([]);
  const [startedAt] = useState(() => Date.now());

  const handleSelect = (label: string) => {
    if (selected.includes(label)) {
      return;
    }

    setSelected((current) => [...current, label]);
  };

  const resetGame = () => {
    setSelected([]);
  };

  const finishGame = () => {
    if (selected.length !== round.items.length) {
      return;
    }

    let correct = 0;

    selected.forEach((label, index) => {
      if (label === round.items[index].label) {
        correct++;
      }
    });

    const accuracy = Math.round((correct / round.items.length) * 100);

    const responseTime = Math.max(
      1,
      Math.round((Date.now() - startedAt) / 1000),
    );

    const score = correct * 100;

    router.replace({
      pathname: "/(authenticated)/(patient)/result",
      params: {
        gameId,
        score: String(score),
        accuracy: String(accuracy),
        responseTime: String(responseTime),
      },
    });
  };

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

          <Text style={styles.headerTitle}>Memory Sequence</Text>

          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.kicker}>REMEMBER THE ORDER</Text>

        <Text style={styles.title}>{round.prompt}</Text>

        <Text style={styles.subtitle}>
          Select the items in the correct order.
        </Text>

        <View style={styles.selectedCard}>
          <Text style={styles.cardTitle}>Your sequence</Text>

          {selected.length === 0 ? (
            <Text style={styles.emptyText}>Choose an item below to begin.</Text>
          ) : (
            <View style={styles.sequence}>
              {selected.map((label, index) => (
                <View key={label} style={styles.sequenceItem}>
                  <View style={styles.number}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                  </View>

                  <Text style={styles.sequenceText}>{label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.items}>
          {shuffledItems.map((item) => {
            const isSelected = selected.includes(item.label);

            return (
              <Pressable
                key={item.label}
                disabled={isSelected}
                onPress={() => handleSelect(item.label)}
                style={[styles.item, isSelected && styles.itemSelected]}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>

                <Text style={styles.itemLabel}>{item.label}</Text>

                {isSelected && (
                  <View style={styles.check}>
                    <Check size={15} color="#FFFFFF" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[
            styles.finishButton,
            selected.length !== round.items.length && styles.finishDisabled,
          ]}
          disabled={selected.length !== round.items.length}
          onPress={finishGame}
        >
          <Text style={styles.finishText}>Check Answer</Text>
        </Pressable>

        <Pressable style={styles.resetButton} onPress={resetGame}>
          <RotateCcw size={17} color={colors.text} />

          <Text style={styles.resetText}>Start again</Text>
        </Pressable>

        <View style={styles.hint}>
          <Text style={styles.hintTitle}>Hint</Text>

          <Text style={styles.hintText}>{round.hint}</Text>
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
    paddingBottom: 50,
  },

  header: {
    paddingTop: 20,
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
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },

  headerSpacer: {
    width: 44,
  },

  kicker: {
    marginTop: 30,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.coral,
    textAlign: "center",
  },

  title: {
    marginTop: 8,
    fontSize: 27,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
  },

  selectedCard: {
    marginTop: 24,
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },

  emptyText: {
    marginTop: 10,
    color: colors.muted,
    fontSize: 13,
  },

  sequence: {
    marginTop: 12,
    gap: 8,
  },

  sequenceItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  number: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.coral,
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    color: colors.white,
    fontWeight: "800",
  },

  sequenceText: {
    marginLeft: 10,
    color: colors.text,
    fontWeight: "600",
  },

  items: {
    marginTop: 18,
    gap: 12,
  },

  item: {
    minHeight: 78,
    padding: 15,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },

  itemSelected: {
    backgroundColor: colors.coralLight,
    borderColor: colors.coral,
    opacity: 0.65,
  },

  emoji: {
    fontSize: 32,
  },

  itemLabel: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },

  finishButton: {
    marginTop: 22,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.coral,
    alignItems: "center",
    justifyContent: "center",
  },

  finishDisabled: {
    opacity: 0.4,
  },

  finishText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },

  resetButton: {
    marginTop: 10,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  resetText: {
    marginLeft: 7,
    fontWeight: "700",
    color: colors.text,
  },

  hint: {
    marginTop: 18,
    padding: 16,
    borderRadius: 18,
    backgroundColor: colors.coralLight,
  },

  hintTitle: {
    fontWeight: "800",
    color: colors.text,
  },

  hintText: {
    marginTop: 5,
    color: colors.muted,
    lineHeight: 19,
  },
});
