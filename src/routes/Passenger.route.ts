import { Hono } from "hono";
import {
  handleCancelBooking,
  handleCreatePassenger,
  handleGetSchedulePassenger,
} from "../controllers/Passenger.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const passengerRoute = new Hono();

passengerRoute
  .route("/:id")
  .post(authMiddleware, handleCreatePassenger)
  .get(handleGetSchedulePassenger)
  .delete(authMiddleware, handleCancelBooking);

export default passengerRoute;
