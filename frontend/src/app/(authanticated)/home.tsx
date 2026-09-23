import { View, StyleSheet, StatusBar, Pressable, Text } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Home() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const languages = ["English", "हिंदी", "অসমীয়া", "বাংলা", "മণিপুরি"];

  const selectLanguage = (item: string) => {
    setLanguage(item);
    setLanguageOpen(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.main}>
        {/* TOP BAR */}
        <View style={styles.topBar}>
          {/* Language */}
          <View style={styles.languageWrapper}>
            <Pressable
              style={styles.languageBtn}
              onPress={() => setLanguageOpen(!languageOpen)}
            >
              <Text style={styles.languageIcon}>文</Text>

              <Text style={styles.languageText}>{language}</Text>

              <Text style={styles.arrow}>{languageOpen ? "⌃" : "⌄"}</Text>
            </Pressable>

            {/* Dropdown */}
            {languageOpen && (
              <View style={styles.dropdown}>
                {languages.map((item) => (
                  <Pressable
                    key={item}
                    style={[
                      styles.option,
                      language === item && styles.selectedOption,
                    ]}
                    onPress={() => selectLanguage(item)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        language === item && styles.selectedOptionText,
                      ]}
                    >
                      {item}
                    </Text>

                    {language === item && <Text style={styles.check}>✓</Text>}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Logout */}
          <Pressable
            style={styles.logoutBtn}
            onPress={() => {
              router.replace("/");
              console.log("Logout");
            }}
          >
            <Text style={styles.logoutIcon}>↪</Text>

            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        {/* CENTER CONTENT */}
        <View style={styles.center}>
          <Text style={styles.welcome}>Welcome 👋</Text>

          <Text style={styles.subtitle}>Ready for today's activity?</Text>

          {/* START GAME */}
          <Pressable
            style={({ pressed }) => [
              styles.startBtn,
              pressed && styles.startBtnPressed,
            ]}
            onPress={() => {
              console.log("Game started");
            }}
          >
            <View style={styles.gameIcon}>
              <Text style={styles.gameIconText}>▶</Text>
            </View>

            <View>
              <Text style={styles.startText}>Start Game</Text>

              <Text style={styles.startSubText}>
                Begin today's memory activity
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
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

  main: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  // =========================
  // TOP BAR
  // =========================

  topBar: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",
  },

  // =========================
  // LANGUAGE
  // =========================

  languageWrapper: {
    position: "relative",

    zIndex: 20,
  },

  languageBtn: {
    minWidth: 150,
    height: 56,

    paddingHorizontal: 16,

    backgroundColor: "white",

    borderRadius: 16,

    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    borderWidth: 1,

    borderColor: "#E5E7EF",

    elevation: 3,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 5,
  },

  languageIcon: {
    fontSize: 20,

    color: "#6C4AB6",
  },

  languageText: {
    flex: 1,

    fontSize: 17,

    color: "#252333",

    fontWeight: "600",
  },

  arrow: {
    fontSize: 22,

    color: "#6C4AB6",

    marginTop: -4,
  },

  // =========================
  // DROPDOWN
  // =========================

  dropdown: {
    position: "absolute",

    top: 62,

    left: 0,

    width: 210,

    backgroundColor: "white",

    borderRadius: 16,

    paddingVertical: 6,

    borderWidth: 1,

    borderColor: "#E5E7EF",

    elevation: 8,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.12,

    shadowRadius: 8,
  },

  option: {
    minHeight: 52,

    paddingHorizontal: 18,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  selectedOption: {
    backgroundColor: "#F0EBFF",
  },

  optionText: {
    fontSize: 17,

    color: "#333",
  },

  selectedOptionText: {
    color: "#6C4AB6",

    fontWeight: "700",
  },

  check: {
    fontSize: 20,

    color: "#6C4AB6",

    fontWeight: "bold",
  },

  // =========================
  // LOGOUT
  // =========================

  logoutBtn: {
    height: 52,

    paddingHorizontal: 18,

    backgroundColor: "#FFF1F1",

    borderRadius: 16,

    borderWidth: 1,

    borderColor: "#FFD4D4",

    flexDirection: "row",

    alignItems: "center",

    gap: 8,
  },

  logoutIcon: {
    fontSize: 20,

    color: "#D64545",
  },

  logoutText: {
    fontSize: 16,

    color: "#D64545",

    fontWeight: "600",
  },

  // =========================
  // CENTER
  // =========================

  center: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    paddingBottom: 60,
  },

  welcome: {
    fontSize: 34,

    fontWeight: "700",

    color: "#252333",

    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,

    color: "#777582",

    marginBottom: 35,
  },

  // =========================
  // START GAME
  // =========================

  startBtn: {
    width: 340,

    minHeight: 105,

    paddingHorizontal: 24,

    paddingVertical: 18,

    backgroundColor: "#6C4AB6",

    borderRadius: 22,

    flexDirection: "row",

    alignItems: "center",

    gap: 18,

    elevation: 7,

    shadowColor: "#6C4AB6",

    shadowOffset: {
      width: 0,

      height: 5,
    },

    shadowOpacity: 0.25,

    shadowRadius: 8,
  },

  startBtnPressed: {
    transform: [
      {
        scale: 0.97,
      },
    ],

    opacity: 0.9,
  },

  gameIcon: {
    width: 62,

    height: 62,

    borderRadius: 31,

    backgroundColor: "rgba(255,255,255,0.2)",

    justifyContent: "center",

    alignItems: "center",
  },

  gameIconText: {
    color: "white",

    fontSize: 24,
    marginLeft: 3,
  },

  startText: {
    color: "white",

    fontSize: 23,

    fontWeight: "700",

    marginBottom: 4,
  },

  startSubText: {
    color: "#E8DFFF",

    fontSize: 14,
  },
});
