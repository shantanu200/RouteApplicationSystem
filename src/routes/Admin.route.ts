import { Hono } from "hono";

import {
  handleCreateFakeBuses,
  handleCreateFakeBusesSchedule,
  handleCreateFakeCities,
  handleCreateFakeOperators,
  handleCreateFakeOperatorsCities,
  handleCreateFakeOperatorsCitiesPoints,
  handleCreateMultipleCities,
} from "../controllers/Admin.controller";

const adminRouter = new Hono();

adminRouter.post("/cities", handleCreateMultipleCities);

adminRouter.post("/fake/cities", handleCreateFakeCities);

adminRouter.post("/fake/operators", handleCreateFakeOperators);

adminRouter.post("/fake/operatorcities", handleCreateFakeOperatorsCities);

adminRouter.post(
  "/fake/operatorcitiespoints",
  handleCreateFakeOperatorsCitiesPoints,
);

adminRouter.post("/fake/buses", handleCreateFakeBuses);
adminRouter.post("/fake/schedule", handleCreateFakeBusesSchedule);
export default adminRouter;
