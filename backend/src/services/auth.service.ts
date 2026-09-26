import config from "../config.js";
import { db } from "@mindcare-ner/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// TYPES
type UserRole = "patient" | "caregiver";

interface SignupInput {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  role: UserRole;
}

interface LoginInput {
  email: string;
  password: string;
}

// TOKEN GENERATION
const generateAccessToken = (userId: string, role: UserRole) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    config.jwt_secret,
    {
      expiresIn: "15m",
    },
  );
};

const generateRefreshToken = (userId: string, role: UserRole) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    config.jwt_refresh_secret,
    {
      expiresIn: "7d",
    },
  );
};

// SIGNUP
export const signupUser = async (input: SignupInput) => {
  const { fullName, email, phone, password, role } = input;

  const existingUser = await db.orm.public.User.first({
    email,
  });

  if (existingUser) {
    const error = new Error("An account with this email already exists");

    (error as any).statusCode = 409;

    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await db.orm.public.User.create({
    email,
    fullName,
    passwordHash,
    role,
    phone: phone ? phone : null,
  });

  if (role === "patient") {
    await db.orm.public.Patient.create({
      userId: user.id,
      patientCode: `PAT-${Date.now()}`,
      displayName: fullName,
      primaryLanguage: "en",
    });
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
};

// LOGIN
export const loginUser = async (input: LoginInput) => {
  const { email, password } = input;

  // ----------------------------------------------------------
  // 1. Find user
  // ----------------------------------------------------------

  const user = await db.orm.public.User.first({
    email,
  });

  if (!user) {
    const error = new Error("Invalid email or password");

    (error as any).statusCode = 401;

    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    const error = new Error("Invalid email or password");

    (error as any).statusCode = 401;

    throw error;
  }

  const accessToken = generateAccessToken(user.id, user.role as UserRole);

  const refreshToken = generateRefreshToken(user.id, user.role as UserRole);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },

    accessToken,
    refreshToken,
  };
};

// REFRESH ACCESS TOKEN
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, config.jwt_refresh_secret) as {
      userId: string;
      role: UserRole;
    };

    const user = await db.orm.public.User.first({
      id: decoded.userId,
    });

    if (!user) {
      const error = new Error("User no longer exists");

      (error as any).statusCode = 401;

      throw error;
    }

    const accessToken = generateAccessToken(user.id, user.role as UserRole);

    return {
      accessToken,
    };
  } catch (error) {
    const authError = new Error("Invalid or expired refresh token");

    (authError as any).statusCode = 401;

    throw authError;
  }
};

// LOGOUT
export const logoutUser = async (userId: string) => {
  /*
   * For our current JWT implementation there is no
   * server-side token to delete yet.
   *
   * The mobile application will remove its stored tokens
   * from SecureStore.
   *
   * We keep this service function so that later we can
   * implement refresh-token storage/revocation in the
   * database without changing the controller.
   */

  const user = await db.orm.public.User.select("id").first({
    id: userId,
  });

  if (!user) {
    const error = new Error("User not found");

    (error as any).statusCode = 404;

    throw error;
  }

  return true;
};
