import { Context } from "hono";
import prisma from "../config/db";
import {
  ErrorRouter,
  ServerErrorRouter,
  SuccessRouter,
} from "../handlers/Request.handler";
import {
  deleteOperator,
  getAllOperators,
  getOperator,
  getOperatorAnalytics,
  getOperatorByEmail,
  updateOperator,
} from "../functions/Operator.function";
import { createToken } from "../utils/Token.util";
import IMiddleware from "../types/IMiddleware";

export async function handleCreateOperator(c: Context) {
  try {
    const body = await c.req.json();
    const operatorObj = await prisma.operator.create({
      data: body,
    });
    const token = await createToken({
      userId: operatorObj.id,
      email: operatorObj.email,
      role: "operator",
    });
    return SuccessRouter(c, "Operator created successfully", {
      email: operatorObj.email,
      accessToken: token,
    });
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleAllOperator(c: Context) {
  try {
    const operatorObj = await getAllOperators();
    return SuccessRouter(c, "All Operators list", operatorObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetOperator(c: IMiddleware) {
  try {
    const { userId } = c;
    const operatorObj = await getOperator(Number(userId));
    return operatorObj === null
      ? ErrorRouter(c, "No such operator found")
      : SuccessRouter(c, "Operator fetched successfully", operatorObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleUpdateOperator(c: IMiddleware) {
  try {
    const { userId } = c;
    const body = await c.req.json();
    const operatorObj = await updateOperator(Number(userId), body);
    return SuccessRouter(c, "Operator updated successfully", operatorObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleDeleteOperator(c: IMiddleware) {
  try {
    const { userId } = c;
    const operatorObj = await deleteOperator(Number(userId));
    return operatorObj !== null
      ? SuccessRouter(c, "Operator deleted successfully", operatorObj)
      : ErrorRouter(c, "Unable to delete operator");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleLoginOperator(c: Context) {
  try {
    const { email, password } = await c.req.json();

    const operatorObj = await getOperatorByEmail(email);

    if (operatorObj === null) {
      return ErrorRouter(c, "User not found");
    } else if (operatorObj.password != password) {
      return ErrorRouter(c, "Invalid password");
    } else {
      const token = await createToken({
        userId: operatorObj.id,
        email: operatorObj.email,
        role: "operator",
      });
      return SuccessRouter(c, "Operator logged in successfully", {
        email: operatorObj.email,
        accessToken: token,
      });
    }
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleOperatorAnalytics(c: IMiddleware) {
  try {
    const { userId } = c;

    const operatorObj = await getOperatorAnalytics(Number(userId));

    return operatorObj !== null
      ? SuccessRouter(c, "Operator Analytics", operatorObj)
      : ErrorRouter(c, "No such operator found");
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}
