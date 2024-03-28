import moment from "moment";
import prisma from "../config/db";
import { IPassenger } from "../types/Bus";
import { sendBookingDetails } from "../services/SMS";

export async function createPassenger(
  busId: number,
  body: IPassenger[],
  userId?: number
) {
  const date = moment().format("YYYY-MM-DD");
  if (userId) {
    return await prisma.passenger.createMany({
      data: body.map((item) => ({
        ...item,
        date,
        userId,
        email: "random@gmail.com",
        busScheduleId: busId,
      })),
    });
  }
  return await prisma.passenger.createMany({
    data: body.map((item) => ({
      ...item,
      date,
      email: "random@gmail.com",
      busScheduleId: busId,
    })),
  });
}

export async function getSchedulePassenger(id: number) {
  return await prisma.passenger.findMany({
    where: {
      busScheduleId: id,
    },
  });
}

export async function updatePassenger(id: number, body: IPassenger) {
  return await prisma.passenger.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });
}

export async function cancelBooking(id: number) {
  return await prisma.passenger.update({
    where: {
      id,
    },
    data: {
      seat: "null",
      status: "CANCELED",
    },
  });
}
