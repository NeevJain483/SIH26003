import { Bell } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  gamesToday: number;
  difficulty: string;
};

export default function TodayStrip({
  gamesToday,
  difficulty,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Bell size={20} color="#D6A83D" />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          Today with Mitali
        </Text>

        <Text style={styles.subtitle}>
          One activity and three gentle reminders
        </Text>
      </View>

      <View style={styles.metrics}>
        <Text style={styles.metric}>
          {gamesToday} games
        </Text>

        <Text style={styles.metric}>
          {difficulty} level
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFF8E7",
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#6B7280",
  },

  metrics: {
    alignItems: "flex-end",
  },

  metric: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    marginVertical: 2,
  },
});