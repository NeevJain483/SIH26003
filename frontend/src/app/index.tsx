import {
  View,
  StyleSheet,
  StatusBar,
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useState } from "react";
import { router } from "expo-router";
import api from "@/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    setLoginError("");
    console.log("hello");
    try {
      const res = await api.login(email, password);
      console.log(res);
      router.replace("/(authanticated)/home");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(
        "Unable to log in. Check your email, password, and connection.",
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>MINDCARE</Text>

            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.subtitle}>Login to continue your journey</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
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
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Remember + Forgot */}
            <View style={styles.optionsRow}>
              {/* <Pressable
                style={styles.rememberContainer}
                onPress={() => {
                  setRememberMe(!rememberMe);
                }}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxSelected,
                  ]}
                >
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>

                <Text style={styles.rememberText}>Remember me</Text>
              </Pressable> */}

              <Pressable
                onPress={() => {
                  console.log("Forgot password");
                }}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Pressable
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>

            {loginError ? (
              <Text style={styles.loginError}>{loginError}</Text>
            ) : null}

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />

              <Text style={styles.orText}>OR</Text>

              <View style={styles.divider} />
            </View>

            {/* Signup */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupQuestion}>Don't have an account?</Text>

              <Pressable
                onPress={() => {
                  router.replace("/signup");
                }}
              >
                <Text style={styles.signupText}>Create Account</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
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

  form: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#353341",
    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 58,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E2EA",
    borderRadius: 14,
    paddingHorizontal: 17,
    fontSize: 16,
    color: "#252333",
    elevation: 1,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#C8CAD4",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  checkboxSelected: {
    backgroundColor: "#6C4AB6",
    borderColor: "#6C4AB6",
  },

  checkmark: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  rememberText: {
    fontSize: 14,
    color: "#666572",
  },

  forgotText: {
    fontSize: 14,
    color: "#6C4AB6",
    fontWeight: "600",
  },

  loginButton: {
    height: 58,
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

  loginButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  loginError: {
    color: "#C62828",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
    gap: 12,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E1E2E8",
  },

  orText: {
    fontSize: 13,
    color: "#999",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  signupQuestion: {
    fontSize: 15,
    color: "#777582",
  },

  signupText: {
    fontSize: 15,
    color: "#6C4AB6",
    fontWeight: "700",
  },
});
