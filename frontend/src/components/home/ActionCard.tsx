import { ChevronRight } from "lucide-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  title: string;
  text: string;
  emoji: string;
  onPress: () => void;
};

export default function ActionCard({
  title,
  text,
  emoji,
  onPress,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.icon}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>

      <ChevronRight size={20} color="#6B7280" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },

  pressed: {
    opacity: 0.7,
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0ED",
  },

  emoji: {
    fontSize: 24,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
  },

  text: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },
});