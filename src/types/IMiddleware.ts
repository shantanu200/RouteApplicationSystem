import { Context } from "hono";

export default interface IMiddleware extends Context {
  userId?: number;
  role?: string;
}
