import type { Request, Response, NextFunction } from "express";

import {
  signupUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/auth.service.js";

// POST /auth/signup
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log("registering");
  try {
    const user = await signupUser(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// POST /auth/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// POST /auth/refresh
export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });

      return;
    }

    const result = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// POST /auth/logout
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    await logoutUser(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
