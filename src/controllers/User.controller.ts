import { Context } from "hono";
import {
  createUser,
  getUserByContact,
  getUser,
  getUsersBooking,
  updateUser,
} from "../functions/User.function";
import {
  ErrorRouter,
  ServerErrorRouter,
  SuccessRouter,
} from "../handlers/Request.handler";
import { createToken } from "../utils/Token.util";
import IMiddleware from "../types/IMiddleware";

export async function handleCreateUser(c: Context) {
  try {
    const body = await c.req.json();
    const dbObj = await createUser(body);

    const token = await createToken({
      userId: dbObj.id,
      email: dbObj.email,
      role: "user",
    });

    return dbObj !== null
      ? SuccessRouter(c, "User created successfully", {
          email: dbObj.email,
          accessToken: token,
        })
      : ErrorRouter(c, "User creation failed");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleLoginUser(c: Context) {
  try {
    const body = await c.req.json();
    const dbObj = await getUserByContact(body?.contact);

    if (dbObj === null) {
      return ErrorRouter(c, "User not found");
    } else if (dbObj?.password !== body?.password) {
      return ErrorRouter(c, "Password is incorrect");
    } else {
      const token = await createToken({
        userId: dbObj.id,
        contact: dbObj.contact,
        role: "user",
      });
      return SuccessRouter(c, "User found successfully", {
        email: dbObj.email,
        accessToken: token,
      });
    }
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetUser(c: IMiddleware) {
  try {
    const { userId } = c;
    const dbObj = await getUser(Number(userId));
    return SuccessRouter(c, "User found successfully", dbObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleUserBookings(c: IMiddleware) {
  try {
    const { userId } = c;
    const dbObj = await getUsersBooking(Number(userId));
    return dbObj !== null
      ? SuccessRouter(c, "User bookings", dbObj)
      : ErrorRouter(c, "No bookings found");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleUpdateUser(c: IMiddleware) {
  try {
    const { userId } = c;
    const body = await c.req.json();
    const dbObj = await updateUser(Number(userId), body);

    return dbObj !== null
      ? SuccessRouter(c, "User updated successfully", dbObj)
      : ErrorRouter(c, "User update failed");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
