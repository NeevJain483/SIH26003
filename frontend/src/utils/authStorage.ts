import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "mindcare.auth.token";

export async function saveToken(token: string) {
  if (!token.trim()) {
    throw new Error("Cannot store an empty authentication token.");
  }

  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
