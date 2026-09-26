import {
  Bell,
  Check,
} from "lucide-react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../../theme/colors";

type Props = {
  title: string;
  time: string;
  completed?: boolean;
  onPress?: () => void;
};

export default function ReminderRow({
  title,
  time,
  completed = false,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
    >
      <View
        style={[
          styles.icon,
          completed && styles.completedIcon,
        ]}
      >
        {completed ? (
          <Check size={18} color="#FFFFFF" />
        ) : (
          <Bell size={18} color={colors.mustard} />
        )}
      </View>

      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            completed && styles.completedTitle,
          ]}
        >
          {title}
        </Text>

        <Text style={styles.time}>{time}</Text>
      </View>

      <View
        style={[
          styles.status,
          completed && styles.completedStatus,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            completed && styles.completedStatusText,
          ]}
        >
          {completed ? "Done" : "Pending"}
        </Text>
      </View>
    </Pressable>
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
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.mustardLight,
    alignItems: "center",
    justifyContent: "center",
  },

  completedIcon: {
    backgroundColor: colors.success,
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

  completedTitle: {
    textDecorationLine: "line-through",
    color: colors.muted,
  },

  time: {
    marginTop: 3,
    fontSize: 11,
    color: colors.muted,
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: colors.mustardLight,
  },

  completedStatus: {
    backgroundColor: colors.leafLight,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.mustard,
  },

  completedStatusText: {
    color: colors.success,
  },
});