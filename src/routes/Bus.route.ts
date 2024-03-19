import { Hono } from "hono";
import {
  handleCreateBus,
  handleCreateBusSchedule,
  handleDeleteBusSchedule,
  handleGetBus,
  handleGetBusSchedule,
  handleGetBusSingleSchedule,
  handleGetOperatorBuses,
  handleGetTodayBusSchedule,
} from "../controllers/Bus.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const busRouter = new Hono();

busRouter.route("/").post(authMiddleware, handleCreateBus);

busRouter.route("/details/:id").get(handleGetBus);

busRouter.use(authMiddleware);

busRouter.route("/operator").get(handleGetOperatorBuses);

busRouter
  .route("/schedule/:id")
  .post(handleCreateBusSchedule)
  .get(handleGetBusSchedule)
  .delete(handleDeleteBusSchedule);

busRouter.route("/schedule-day/:id").get(handleGetBusSingleSchedule);

busRouter.route("/opeator-schedule/:id").get(handleGetTodayBusSchedule);

export default busRouter;
