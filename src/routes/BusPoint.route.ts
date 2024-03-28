import { Hono } from "hono";
import {
  handleCreateOperator,
  handleGetOperator,
} from "../controllers/Operator.controller";
import {
  handleCreateBusCity,
  handleCreateBusPoint,
  handleGetOperatorCities,
  handleGetOperatorCitiesPoints,
  handleGetBusPoint,
  handleDeleteOperatorCitiesPoints,
  handleGetOperatorCitiesName,
} from "../controllers/BusPoints.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const busPointRouter = new Hono();

busPointRouter
  .route("/point/:id")
  .post(handleCreateBusPoint)
  .get(handleGetOperatorCitiesPoints)
  .delete(handleDeleteOperatorCitiesPoints);

busPointRouter.use("*", authMiddleware);

busPointRouter.post("/", handleCreateBusCity);

busPointRouter.get("/details/:id", handleGetBusPoint);

busPointRouter.get("/operator", handleGetOperatorCities);

busPointRouter.get("/operator/city", handleGetOperatorCitiesName);

export default busPointRouter;
