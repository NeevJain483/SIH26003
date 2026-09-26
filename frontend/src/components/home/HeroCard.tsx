import { Play } from "lucide-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onPress: () => void;
};

export default function HeroCard({ onPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.kicker}>
          TODAY'S SMALL STEP
        </Text>

        <Text style={styles.title}>
          Let’s remember something beautiful.
        </Text>

        <Text style={styles.description}>
          Take your time. There are no wrong turns here.
        </Text>

        <Pressable style={styles.button} onPress={onPress}>
          <Play size={17} color="#FFFFFF" fill="#FFFFFF" />

          <Text style={styles.buttonText}>
            Play Memory Sequence
          </Text>
        </Pressable>
      </View>

      <View style={styles.art}>
        <Text style={styles.house}>🏡</Text>
        <Text style={styles.leaf}>🌿</Text>
        <Text style={styles.smallLeaf}>🌱</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 250,
    borderRadius: 26,
    padding: 24,
    backgroundColor: "#FFF0ED",
    overflow: "hidden",
    flexDirection: "row",
  },

  content: {
    flex: 1,
    zIndex: 2,
  },

  kicker: {
    fontSize: 12,
    fontWeight: "800",
    color: "#C85D50",
    letterSpacing: 1,
  },

  title: {
    marginTop: 10,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "800",
    color: "#302522",
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: "#6B5B57",
  },

  button: {
    alignSelf: "flex-start",
    marginTop: 20,
    paddingHorizontal: 16,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: "#F47C6C",
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  art: {
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  house: {
    fontSize: 58,
  },

  leaf: {
    position: "absolute",
    right: 4,
    top: 30,
    fontSize: 35,
  },

  smallLeaf: {
    position: "absolute",
    left: 0,
    bottom: 10,
    fontSize: 25,
  },
});