import { Hono } from "hono";
import {
  handleGetLocation,
  handleGetSuggestLocation,
} from "../controllers/Location.controller";

const locationRouter = new Hono();

locationRouter.get("/", handleGetLocation);

locationRouter.get("/suggest", handleGetSuggestLocation);

export default locationRouter;
