import { Context } from "hono";
import {
  createPassenger,
  getSchedulePassenger,
} from "../functions/Passenger.Function";
import { ServerErrorRouter, SuccessRouter } from "../handlers/Request.handler";

export async function handleCreatePassenger(c: Context) {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const passengerObj = await createPassenger(Number(id), body);

    return SuccessRouter(c, "Passenger added", passengerObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetSchedulePassenger(c: Context) {
  try {
    const id = c.req.param("id");
    const passengers = await getSchedulePassenger(Number(id));

    return passengers !== null
      ? SuccessRouter(c, "Passengers for Schedule", passengers)
      : SuccessRouter(c, "No passengers found", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

