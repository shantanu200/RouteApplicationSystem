import { Hono } from "hono";
import { handleGetCities } from "../controllers/Global.controller";

const globalRouter = new Hono();

globalRouter.get("/cities", handleGetCities);

export default globalRouter;
