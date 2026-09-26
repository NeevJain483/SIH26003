import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";
import { router } from "expo-router";

import {
  ArrowLeft,
  UserPlus,
} from "lucide-react-native";

import { colors } from "@/theme/colors";

export default function AddPatient() {
  const [patientId, setPatientId] = useState("");

  const handleAddPatient = () => {
    if (!patientId.trim()) {
      return;
    }

    console.log("Adding patient:", patientId);

    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft
              size={22}
              color={colors.text}
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            Add Patient
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.hero}>
          <View style={styles.iconCircle}>
            <UserPlus
              size={30}
              color={colors.coral}
            />
          </View>

          <Text style={styles.title}>
            Connect a patient
          </Text>

          <Text style={styles.subtitle}>
            Enter the patient ID provided by the
            patient account.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Patient ID
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter patient ID"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            value={patientId}
            onChangeText={setPatientId}
          />

          <Text style={styles.helper}>
            Ask the patient for the ID shown in their
            account.
          </Text>

          <Pressable
            style={[
              styles.button,
              !patientId.trim() && styles.buttonDisabled,
            ]}
            disabled={!patientId.trim()}
            onPress={handleAddPatient}
          >
            <UserPlus
              size={18}
              color="#FFFFFF"
            />

            <Text style={styles.buttonText}>
              Add Patient
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 110,
  },

  header: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.text,
  },

  headerSpacer: {
    width: 44,
  },

  hero: {
    marginTop: 40,
    alignItems: "center",
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.coralLight,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 18,
    fontSize: 27,
    fontWeight: "800",
    color: colors.text,
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
  },

  card: {
    marginTop: 28,
    padding: 20,
    borderRadius: 22,
    backgroundColor: colors.white,
  },

  label: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },

  input: {
    height: 52,
    paddingHorizontal: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    backgroundColor: colors.background,
  },

  helper: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },

  button: {
    marginTop: 20,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.coral,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },
});