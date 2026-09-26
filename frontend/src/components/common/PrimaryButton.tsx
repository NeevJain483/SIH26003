import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ChevronRight } from "lucide-react-native";

type Props = {
  title: string;
  onPress: () => void;
  showArrow?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  showArrow = true,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>

      {showArrow && (
        <View style={styles.arrow}>
          <ChevronRight size={18} color="#FFFFFF" />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: "#F47C6C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.8,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  arrow: {
    marginLeft: 6,
  },
});