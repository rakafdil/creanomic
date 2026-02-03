import { AuthService } from "./auth.service.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";
/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 * @typedef {import("@supabase/supabase-js").SupabaseClient} SupabaseClient
 * @typedef {import("../../types/auth").UserData} UserData
 */

export class AuthController {
  /**
   * @param {SupabaseClient} supabase
   */
  constructor(supabase) {
    this.supabase = supabase;
    this.authService = new AuthService(supabase);
    this.directUrl =
      process.env.NODE_ENV === "production"
        ? "https://creanomic.vercel.app/auth/callback"
        : "http://localhost:3000/auth/callback";

    const methods = [
      "signup",
      "login",
      "confirmEmail",
      "forgotPassword",
      "handleResetPassword",
      "getProfile",
      "logout",
      "loginWithGoogle",
      "oauthSession",
    ];

    methods.forEach((method) => {
      this[method] = catchAsyncError(this[method].bind(this));
    });
  }

  async signup(req, res) {
    /** @type {UserData} */
    const { email, password, confirmPassword, username, firstName, lastName } =
      req.body;

    const userData = {
      email,
      password,
      confirmPassword,
      username,
      firstName,
      lastName,
    };

    const result = await this.authService.signup(userData, this.directUrl);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: result,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const result = await this.authService.login({ email, password });

    res.cookie("authToken", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: result,
    });
  }

  async loginWithGoogle(req, res) {
    const { url } = await this.authService.loginWithGoogle(this.directUrl);
    return res.redirect(url);
  }

  async confirmEmail(req, res) {
    const result = await this.authService.emailConfirmation();
    res.status(200).json({
      status: "success",
      message: result.message || "Email confirmed successfully",
    });
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    const result = await this.authService.forgotPassword(email);
    res.status(200).json({
      status: "success",
      message: result.message,
    });
  }

  async handleResetPassword(req, res) {
    const { newPassword, accessToken } = req.body;
    const result = await this.authService.handleResetPassword(
      newPassword,
      accessToken,
    );
    res.status(200).json({
      status: "success",
      message: result.message,
    });
  }

  async getProfile(req, res) {
    const user = req.user;
    const userData = await this.authService.getUserProfile(user);
    res.status(200).json({
      status: "success",
      message: "Profile retrieved successfully",
      data: { userData },
    });
  }

  async logout(req, res) {
    await this.authService.logout();

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      status: "success",
      message: "Logout successful",
    });
  }

  async callback(req, res) {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Missing OAuth code" });
    }

    const { data, error } =
      await this.supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      return res.status(401).json({ message: "OAuth failed" });
    }

    await this.authService.handleOAuthUser(data.user);

    const accessToken = data.session.access_token;

    res.cookie("authToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(
      process.env.NODE_ENV === "production"
        ? "https://creanomic.vercel.app/profile"
        : "http://localhost:3000/profile",
    );
  }

  async oauthSession(req, res) {
    const { accessToken, refreshToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: "Missing access token" });
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await this.supabase.auth.getUser(accessToken);

      if (userError || !user) {
        return res.status(401).json({ message: "Invalid access token" });
      }

      const result = await this.authService.handleOAuthUser(user);

      res.cookie("authToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        status: "success",
        message: result.isNewUser
          ? "User created successfully"
          : "User logged in successfully",
        data: {
          user: result.user,
          isNewUser: result.isNewUser,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message || "Failed to process OAuth session",
      });
    }
  }
}
