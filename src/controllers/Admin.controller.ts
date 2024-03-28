import { Context } from "hono";
import {
  ErrorRouter,
  ServerErrorRouter,
  SuccessRouter,
} from "../handlers/Request.handler";
import {
  createFakeBuses,
  createFakeBusesSchedule,
  createFakeCities,
  createFakeOperatorCites,
  createFakeOperatorCitiesPoint,
  createFakeOperators,
  dumpCities,
} from "../functions/Admin.function";
import { createFakeBusesFunc } from "../utils/fake.util";

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

export async function handleCreateFakeCities(c: Context) {
  try {
    const adminObj = await createFakeCities();

    return adminObj !== null
      ? SuccessRouter(c, "Random Cities assigned", adminObj)
      : SuccessRouter(c, "Unable to create random cities.", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleCreateFakeOperators(c: Context) {
  try {
    const adminObj = await createFakeOperators();

    return adminObj !== null
      ? SuccessRouter(c, "Random operators assigned", adminObj)
      : ErrorRouter(c, "Unable to create random operators.");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleCreateFakeOperatorsCities(c: Context) {
  try {
    const adminObj = await createFakeOperatorCites();

    return adminObj !== null
      ? SuccessRouter(c, "Random operators assigned", adminObj)
      : ErrorRouter(c, "Unable to create random operators.");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleCreateFakeOperatorsCitiesPoints(c: Context) {
  try {
    const adminObj = await createFakeOperatorCitiesPoint();

    return adminObj !== null
      ? SuccessRouter(c, "Random operators assigned", adminObj)
      : ErrorRouter(c, "Unable to create random operators.");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
export async function handleCreateFakeBuses(c: Context) {
  try {
    const adminObj = await createFakeBuses();

    return adminObj !== null
      ? SuccessRouter(c, "Random operators assigned", adminObj)
      : ErrorRouter(c, "Unable to create random operators.");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
export async function handleCreateFakeBusesSchedule(c: Context) {
  try {
    const adminObj = await createFakeBusesSchedule();

    return adminObj !== null
      ? SuccessRouter(c, "Random operators assigned", adminObj)
      : ErrorRouter(c, "Unable to create random operators.");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
