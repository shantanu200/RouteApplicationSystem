import { Context } from "hono";
import { ServerErrorRouter, SuccessRouter } from "../handlers/Request.handler";
import { dumpCities } from "../functions/Admin.function";

export async function handleCreateMultipleCities(c: Context) {
  try {
    const adminObj = await dumpCities();

    return adminObj !== null
      ? SuccessRouter(c, "Cities fetched successfully", adminObj)
      : SuccessRouter(c, "No such location found", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
