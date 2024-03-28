import { Hono } from "hono";
import locationRouter from "./Location.route";
import operatorRouter from "./Operator.route";
import busRouter from "./Bus.route";
import busPointRouter from "./BusPoint.route";
import passengerRouter from "./Passenger.route";
import adminRouter from "./Admin.route";
import globalRouter from "./Global.route";
import userRouter from "./User.route";

const verisionRouter = new Hono();

verisionRouter.route("/location", locationRouter);
verisionRouter.route("/operator", operatorRouter);
verisionRouter.route("/bus", busRouter);
verisionRouter.route("/bus-point", busPointRouter);
verisionRouter.route("/passenger", passengerRouter);
verisionRouter.route("/admin", adminRouter);
verisionRouter.route("/", globalRouter);
verisionRouter.route("/user", userRouter);

export default verisionRouter;
