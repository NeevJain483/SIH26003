import { Sun } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import OfflinePill from "../common/OfflinePill";

export default function WelcomeSection() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.topRow}>
          <OfflinePill />

          <Text style={styles.date}>
            Saturday, 19 September 2026
          </Text>
        </View>

        <Text style={styles.title}>
          Good morning, Aita.
        </Text>

        <Text style={styles.subtitle}>
          A gentle moment for memory, connection and joy.
        </Text>
      </View>

      <View style={styles.weather}>
        <Sun size={23} color="#D6A83D" />

        <Text style={styles.temperature}>24°</Text>

        <Text style={styles.location}>
          Jorhat, Assam
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  left: {
    flex: 1,
    paddingRight: 12,
  },

  topRow: {
    marginBottom: 12,
  },

  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#6B7280",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
  },

  weather: {
    width: 82,
    padding: 12,
    borderRadius: 18,
    backgroundColor: "#FFF8E7",
    alignItems: "center",
    justifyContent: "center",
  },

  temperature: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },

  location: {
    marginTop: 2,
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
  },
});