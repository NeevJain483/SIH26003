import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingProps {
  message?: string;
}

export default function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#6C4AB6"
      />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F8FC",
  },

  text: {
    marginTop: 12,
    fontSize: 15,
    color: "#666",
  },
});