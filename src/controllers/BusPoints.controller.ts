import { Context } from "hono";
import { createBus } from "../functions/Bus.function";
import { ServerErrorRouter, SuccessRouter } from "../handlers/Request.handler";
import {
  createBusCity,
  createBusPoint,
  getBusCity,
  getOperatorCity,
  getOperatorCityPoints,
} from "../functions/BusPoint.function";
import IMiddleware from "../types/IMiddleware";
import { cacheMiddleware, clearCache } from "../cache";

export async function handleCreateBusCity(c: IMiddleware) {
  try {
    const { userId } = c;
    const body = await c.req.json();
    const busObj = await createBusCity(Number(userId), body);
    clearCache(`cities_${userId}`);
    return SuccessRouter(c, "Bus created successfully", busObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetBusPoint(c: IMiddleware) {
  try {
    const id = c.req.param("id");
    const busObj = await getBusCity(Number(id));
    return busObj !== null
      ? SuccessRouter(c, "City Details found successfully", busObj)
      : SuccessRouter(c, "City Details not found", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetOperatorCities(c: IMiddleware) {
  try {
    const { userId } = c;
    console.log(userId);
    const busObj = await cacheMiddleware(`cities_${userId}`, () =>
      getOperatorCity(Number(userId)),
    );
    return busObj !== null
      ? SuccessRouter(c, "Operator all cities", busObj)
      : SuccessRouter(c, "No Operator cities found", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleCreateBusPoint(c: Context) {
  try {
    const body = await c.req.json();
    const id = c.req.param("id");
    const busObj = await createBusPoint(Number(id), body);
    return SuccessRouter(c, "Bus Point created successfully", busObj);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}

export async function handleGetOperatorCitiesPoints(c: Context) {
  try {
    const id = c.req.param("id");
    const busObj = await getOperatorCityPoints(Number(id));
    return busObj !== null
      ? SuccessRouter(c, "Operator all cities points", busObj)
      : SuccessRouter(c, "No Operator cities points found", []);
  } catch (error) {
    return ServerErrorRouter(c, error);
  }
}