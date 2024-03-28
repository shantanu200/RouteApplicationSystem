import { Context } from "hono";
import {
  getLocations,
  getNearestSuggestion,
} from "../functions/Location.function";
import {
  ErrorRouter,
  ServerErrorRouter,
  SuccessRouter,
} from "../handlers/Request.handler";

export async function handleGetLocation(c: Context) {
  try {
    const query = c.req.query("q");

    const locations = await getLocations(String(query));

    if (locations.length > 0) {
      return SuccessRouter(c, "Locations fetched successfully", locations);
    }
    return SuccessRouter(c, "No such location found", []);
  } catch (error) {
    return ErrorRouter(c, "Failed to fetch locations");
  }
}

export async function handleGetSuggestLocation(c: Context) {
  try {
    const { lat, lng, date, droppingCity,radius,page,limit } = c.req.query();

    const locations = await getNearestSuggestion({
      lat: Number(lat),
      lng: Number(lng),
      date,
      droppingCity: Number(droppingCity),
      radius: Number(radius),
      page: Number(page),
      limit: Number(limit),
    });

    return SuccessRouter(c, "Locations fetched successfully", locations);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
