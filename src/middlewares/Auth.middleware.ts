import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import IMiddleware from "../types/IMiddleware";

export const authMiddleware = async (c: IMiddleware, next: Next) => {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return c.json({
        success: false,
        message: "Please send valid access token",
      });
    }
    const secret = process.env.JWT_SECRET!;
    const { role, userId } = await verify(token, secret);

    if (!role || !userId) {
      return c.json({
        success: false,
        message: "Invalid token is passed | Please login again",
      });
    }

    c.userId = userId;
    c.role = role;

    return await next();
  } catch (error) {
    return c.json({
      success: false,
      message: "Token expired or invalid",
    });
  }
};
