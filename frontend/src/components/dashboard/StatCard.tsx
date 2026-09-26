import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

type Props = {
  value: string;
  label: string;
  emoji: string;
};

export default function StatCard({
  value,
  label,
  emoji,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 115,
    padding: 15,
    borderRadius: 18,
    backgroundColor: colors.white,
  },

  emoji: {
    fontSize: 22,
  },

  value: {
    marginTop: 8,
    fontSize: 23,
    fontWeight: "800",
    color: colors.text,
  },

  label: {
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },
});