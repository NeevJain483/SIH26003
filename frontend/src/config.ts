import Constants from "expo-constants";

const configuredUrl =
  process.env.EXPO_PUBLIC_API_URL?.trim() ||
  Constants.expoConfig?.extra?.apiUrl?.trim();

const config = {
  backend_url: (configuredUrl || "http://localhost:4000").replace(/\/+$/, ""),
};

export default config;
