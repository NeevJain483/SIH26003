import { Heart } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

export default function PatientBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>A</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>CARING FOR</Text>

        <Text style={styles.name}>Aita</Text>

        <Text style={styles.location}>
          Jorhat, Assam
        </Text>
      </View>

      <View style={styles.heart}>
        <Heart
          size={20}
          color={colors.coral}
          fill={colors.coral}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.coral,
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  label: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.muted,
  },

  name: {
    marginTop: 3,
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },

  location: {
    marginTop: 2,
    fontSize: 12,
    color: colors.muted,
  },

  heart: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },
});