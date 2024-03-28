import { Hono } from "hono";
import {
  handleCreateUser,
  handleGetUser,
  handleLoginUser,
  handleUpdateUser,
  handleUserBookings,
} from "../controllers/User.controller";
import { authMiddleware } from "../middlewares/Auth.middleware";

const userRouter = new Hono();

userRouter
  .route("/")
  .post(handleCreateUser)
  .get(authMiddleware, handleGetUser)
  .put(authMiddleware, handleUpdateUser);

userRouter.route("/login").post(handleLoginUser);

userRouter.route("/bookings").get(authMiddleware, handleUserBookings);

export default userRouter;
