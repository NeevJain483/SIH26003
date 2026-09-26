import config from "@/config";
import { saveToken } from "@/utils/authStorage";
import axios, { isAxiosError, type AxiosResponse } from "axios";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  role: "patient" | "caregiver";
}

interface LoginData {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

const api = {
  async register(
    fullName: string,
    email: string,
    phone: string,
    password: string,
    role: "patient" | "caregiver",
  ) {
    const response: AxiosResponse<ApiResponse<AuthUser>> = await axios.post(
      `${config.backend_url}/api/auth/signup`,
      {
        fullName,
        email,
        phone,
        password,
        role,
      },
    );

    return response.data.data;
  },

  async login(email: string, password: string) {
    const response: AxiosResponse<ApiResponse<LoginData>> = await axios.post(
      `${config.backend_url}/api/auth/login`,
      {
        email,
        password,
      },
    );

    const loginData = response.data?.data;
    if (!loginData?.accessToken || !loginData.user) {
      throw new Error("The server returned an incomplete login response.");
    }

    await saveToken(loginData.accessToken);
    return loginData.user;
  },
};

export default api;
