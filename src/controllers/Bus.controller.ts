import { Context } from "hono";
import {
  ErrorRouter,
  ServerErrorRouter,
  SuccessRouter,
} from "../handlers/Request.handler";
import {
  createBus,
  createBusSchedule,
  deleteOperatorSchedule,
  deleteSchedule,
  getBus,
  getBusSchedule,
  getBusSingleSchedule,
  getOperatorTodaySchedule,
  operatorBuses,
} from "../functions/Bus.function";
import IMiddleware from "../types/IMiddleware";
import { clearCache } from "../cache";

export async function handleCreateBus(c: IMiddleware) {
  try {
    const { userId } = c;
    const body = await c.req.json();
    const busObj = await createBus(Number(userId), body);
    clearCache(`cities_${userId}`);
    return busObj !== null
      ? SuccessRouter(c, "Bus created successfully", busObj)
      : ErrorRouter(c, "Failed to create bus");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetBus(c: Context) {
  try {
    const id = c.req.param("id");
    const busObj = await getBus(Number(id));

    return busObj !== null
      ? SuccessRouter(c, "Bus Details", busObj)
      : SuccessRouter(c, "No such bus found", {});
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetOperatorBuses(c: IMiddleware) {
  try {
    const { userId } = c;
    const query = c.req.query("q");
    const busObj = await operatorBuses(Number(userId), String(query) || "");

    return busObj !== null
      ? SuccessRouter(c, "Operator all buses", busObj)
      : SuccessRouter(c, "No Operator buses found", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleCreateBusSchedule(c: Context) {
  try {
    const body = await c.req.json();
    const busObj = await createBusSchedule(Number(c.req.param("id")), body);
    return SuccessRouter(c, "Bus Schedule created successfully", busObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetBusSchedule(c: Context) {
  try {
    const id = c.req.param("id");
    const busObj = await getBusSchedule(Number(id));

    return busObj !== null
      ? SuccessRouter(c, "Bus Schedule", busObj)
      : SuccessRouter(c, "No such bus found", {});
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
export async function handleGetBusSingleSchedule(c: Context) {
  try {
    const id = c.req.param("id");
    const busObj = await getBusSingleSchedule(Number(id));

    return busObj !== null
      ? SuccessRouter(c, "Bus Schedule", busObj)
      : SuccessRouter(c, "No such bus found", {});
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleDeleteBusSchedule(c: IMiddleware) {
  try {
    const { userId } = c;
    const id = c.req.param("id");
    const busObj = await deleteSchedule(Number(id));

    return busObj !== null
      ? SuccessRouter(c, "Bus Schedule Deleted", busObj)
      : SuccessRouter(c, "Unable to delete schedule", {});
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
export async function handleGetTodayBusSchedule(c: Context) {
  try {
    const id = c.req.param("id");
    const busObj = await getOperatorTodaySchedule(Number(id));

    return busObj !== null
      ? SuccessRouter(c, "Operator Complete Schedule", busObj)
      : SuccessRouter(c, "No schedule found", {});
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
