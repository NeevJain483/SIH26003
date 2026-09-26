import { ChevronRight } from "lucide-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../../theme/colors";

type Props = {
  title: string;
  tag: string;
  description: string;
  emoji: string;
  playable: boolean;
  onPress: () => void;
};

export default function GameCard({
  title,
  tag,
  description,
  emoji,
  playable,
  onPress,
}: Props) {
  return (
    <Pressable
      disabled={!playable}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        !playable && styles.disabled,
        pressed && playable && styles.pressed,
      ]}
    >
      <View style={styles.visual}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.tag}>{tag}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      <ChevronRight
        size={22}
        color={playable ? colors.text : colors.muted}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    marginBottom: 14,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  disabled: {
    opacity: 0.55,
  },

  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  visual: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 30,
  },

  content: {
    flex: 1,
    marginHorizontal: 15,
  },

  tag: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.coral,
    marginBottom: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },

  description: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
  },
});