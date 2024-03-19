import { config } from "dotenv";
import { sign } from "hono/jwt";
config();

export async function createToken(payload: any): Promise<string> {
  const secret = process.env.JWT_SECRET;

  const token = await sign(payload, secret!);

  return token;
}
