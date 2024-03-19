import { Hono } from "hono";

import { handleCreateMultipleCities } from "../controllers/Admin.controller";

const adminRouter = new Hono();

adminRouter.post("/cities", handleCreateMultipleCities);

export default adminRouter;
