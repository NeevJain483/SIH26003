import {
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useState } from "react";
import { router } from "expo-router";
import api, { getApiErrorMessage } from "@/api";

export default function Signup() {
  const [role, setRole] = useState<"patient" | "caregiver">("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (loading) {
      return;
    }

    setSignupError("");
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setSignupError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await api.register(
        name.trim(),
        email.trim(),
        phone.trim(),
        password,
        role,
      );

      Alert.alert("Account created", "You can now log in.", [
        { text: "Continue", onPress: () => router.replace("/") },
      ]);
    } catch (error) {
      console.error("Signup failed:", error);
      setSignupError(
        getApiErrorMessage(error, "Unable to create your account."),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.logo}>MINDCARE</Text>

          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Create your account to get started
          </Text>
        </View>

        {/* Form */}

        <View style={styles.form}>
          {/* Name */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              editable={!loading}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Phone */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              editable={!loading}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* Password */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#999"
              secureTextEntry
              editable={!loading}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Role</Text>

            <View style={styles.roleContainer}>
              <Pressable
                style={[
                  styles.roleButton,
                  role === "patient" && styles.roleButtonSelected,
                ]}
                disabled={loading}
                onPress={() => setRole("patient")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "patient" && styles.roleTextSelected,
                  ]}
                >
                  Patient
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.roleButton,
                  role === "caregiver" && styles.roleButtonSelected,
                ]}
                disabled={loading}
                onPress={() => setRole("caregiver")}
              >
                <Text
                  style={[
                    styles.roleText,
                    role === "caregiver" && styles.roleTextSelected,
                  ]}
                >
                  Caregiver
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Confirm Password */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="#999"
              secureTextEntry
              editable={!loading}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Signup Button */}

          <Pressable
            disabled={loading}
            style={({ pressed }) => [
              styles.signupButton,
              pressed && styles.signupButtonPressed,
              loading && styles.signupButtonDisabled,
            ]}
            onPress={handleSignup}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signupText}>Create Account</Text>
            )}
          </Pressable>

          {signupError ? (
            <Text accessibilityRole="alert" style={styles.signupError}>
              {signupError}
            </Text>
          ) : null}

          {/* Login */}

          <View style={styles.loginContainer}>
            <Text style={styles.loginQuestion}>Already have an account?</Text>

            <Pressable
              onPress={() => {
                console.log("Go to login");
                router.replace("/");
              }}
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // =========================
  // SCREEN
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingVertical: 40,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  logo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6C4AB6",
    letterSpacing: 2,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#252333",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#777582",
    textAlign: "center",
  },

  // =========================
  // FORM
  // =========================

  form: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#353341",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 56,

    backgroundColor: "white",

    borderWidth: 1,
    borderColor: "#E0E2EA",

    borderRadius: 14,

    paddingHorizontal: 16,

    fontSize: 16,
    color: "#252333",

    elevation: 1,
  },

  // =========================
  // SIGNUP BUTTON
  // =========================

  signupButton: {
    height: 58,

    marginTop: 10,

    backgroundColor: "#6C4AB6",

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",

    elevation: 5,

    shadowColor: "#6C4AB6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  signupButtonPressed: {
    opacity: 0.8,

    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  signupButtonDisabled: {
    opacity: 0.7,
  },

  signupError: {
    marginTop: 12,
    color: "#B42318",
    fontSize: 14,
    textAlign: "center",
  },

  signupText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  // =========================
  // LOGIN
  // =========================

  loginContainer: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 25,

    gap: 5,
  },

  loginQuestion: {
    fontSize: 15,
    color: "#777582",
  },

  loginText: {
    fontSize: 15,
    color: "#6C4AB6",
    fontWeight: "700",
  },
  roleContainer: {
    flexDirection: "row",
    gap: 12,
  },

  roleButton: {
    flex: 1,
    height: 56,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E2EA",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  roleButtonSelected: {
    backgroundColor: "#F0EBFF",
    borderColor: "#6C4AB6",
  },

  roleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#777582",
  },

  roleTextSelected: {
    color: "#6C4AB6",
    fontWeight: "700",
  },
});
