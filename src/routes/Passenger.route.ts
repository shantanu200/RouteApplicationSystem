import { Hono } from "hono";
import {
  handleCreatePassenger,
  handleGetSchedulePassenger,
} from "../controllers/Passenger.controller";

const passengerRoute = new Hono();

passengerRoute
  .route("/:id")
  .post(handleCreatePassenger)
  .get(handleGetSchedulePassenger);

export default passengerRoute;
