import {
  CheckCircle2,
  Clock3,
} from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

type Props = {
  title: string;
  date: string;
  accuracy: number;
  responseTime: number;
};

export default function ActivityRow({
  title,
  date,
  accuracy,
  responseTime,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <CheckCircle2
          size={21}
          color={colors.success}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.accuracy}>
          {accuracy}%
        </Text>

        <View style={styles.time}>
          <Clock3 size={12} color={colors.muted} />

          <Text style={styles.timeText}>
            {responseTime}s
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.leafLight,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  date: {
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },

  stats: {
    alignItems: "flex-end",
  },

  accuracy: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.success,
  },

  time: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },

  timeText: {
    marginLeft: 3,
    fontSize: 10,
    color: colors.muted,
  },
});