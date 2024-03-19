import { Hono, Context } from "hono";
import {
  handleAllOperator,
  handleCreateOperator,
  handleDeleteOperator,
  handleOperatorAnalytics,
  handleGetOperator,
  handleLoginOperator,
  handleUpdateOperator,
} from "../controllers/Operator.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const operatorRoute = new Hono();

operatorRoute.route("/").post(handleCreateOperator).get(handleAllOperator);

operatorRoute.post("/login", handleLoginOperator);

operatorRoute.route("/:id").get(handleGetOperator);

operatorRoute.use("*", authMiddleware);

operatorRoute.put("/", handleUpdateOperator);
operatorRoute.delete("/", handleDeleteOperator);

operatorRoute.get("/analytics", handleOperatorAnalytics);

export default operatorRoute;
