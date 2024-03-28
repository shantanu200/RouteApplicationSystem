import { Context } from "hono";
import {
  cancelBooking,
  createPassenger,
  getSchedulePassenger,
} from "../functions/Passenger.Function";
import {
  ErrorRouter,
  ServerErrorRouter,
  SuccessRouter,
} from "../handlers/Request.handler";
import IMiddleware from "../types/IMiddleware";

export async function handleCreatePassenger(c: IMiddleware) {
  try {
    const { role, userId } = c;
    const id = c.req.param("id");
    const body = await c.req.json();
    console.log("body", body);
    console.log(role, userId);
    let passengerObj;
    if (role === "user") {
      passengerObj = await createPassenger(Number(id), body, Number(userId));
    } else {
      passengerObj = await createPassenger(Number(id), body);
    }
    return passengerObj !== null
      ? SuccessRouter(c, "Passenger added", passengerObj)
      : ErrorRouter(c, "Passenger creation failed");
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

export async function handleCancelBooking(c: IMiddleware) {
  try {
    const id = c.req.param("id");
    const passengers = await cancelBooking(Number(id));

    return passengers !== null
      ? SuccessRouter(c, "Your booking cancelled", {})
      : ErrorRouter(c, "Unable to cancel Booking");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
