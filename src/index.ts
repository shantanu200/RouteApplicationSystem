import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { config } from "dotenv";
import verisionRouter from "./routes";
config();

const app = new Hono();
app.use("*", logger());
app.use("*", cors());

app.route("/v1", verisionRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 9000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
