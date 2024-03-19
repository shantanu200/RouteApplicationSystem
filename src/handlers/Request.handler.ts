import { Context } from "hono";

export function SuccessRouter(c: Context, message: string, data: any) {
  c.status(200);
  return c.json({ success: true, message, data });
}

export function ErrorRouter(c: Context, message: string) {
  c.status(400);
  return c.json({ success: false, message });
}

export function ServerErrorRouter(c: Context, error: any) {
  console.error(JSON.stringify(error, null, 2));
  c.status(500);
  return c.json({ success: false, message: "Internal Server Error", error });
}

export function AuthErrorRouter(c: Context) {
  c.status(401);
  return c.json({
    success: false,
    message: "Please login access token not found",
  });
}
