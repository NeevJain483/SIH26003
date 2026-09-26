import { CloudOff } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export default function OfflinePill() {
  return (
    <View style={styles.container}>
      <CloudOff size={14} color="#4F6B50" />

      <Text style={styles.text}>Offline Ready</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#EEF8ED",
  },

  text: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "600",
    color: "#4F6B50",
  },
});