import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

type Item = {
  emoji: string;
  label: string;
};

type Props = {
  item: Item;
  selected?: boolean;
  order?: number;
};

export default function SequenceCard({
  item,
  selected = false,
  order,
}: Props) {
  return (
    <View
      style={[
        styles.card,
        selected && styles.selected,
      ]}
    >
      {selected && order !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{order}</Text>
        </View>
      )}

      <Text style={styles.emoji}>{item.emoji}</Text>

      <Text style={styles.label}>{item.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    minHeight: 125,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },

  selected: {
    borderColor: colors.coral,
    backgroundColor: colors.coralLight,
  },

  emoji: {
    fontSize: 38,
  },

  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  badge: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.coral,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },
});