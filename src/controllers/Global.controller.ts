import { Context } from "hono";
import { getCities } from "../functions/Global.function";
import { ServerErrorRouter, SuccessRouter } from "../handlers/Request.handler";
import { cacheMiddleware } from "../cache";

export async function handleGetCities(c: Context) {
  try {
    const cities = await cacheMiddleware("cities", () => getCities(), Infinity);

    return cities !== null
      ? SuccessRouter(c, "Cities fetched successfully", cities)
      : SuccessRouter(c, "No such location found", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
