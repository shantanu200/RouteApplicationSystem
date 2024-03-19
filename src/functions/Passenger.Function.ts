import moment from "moment";
import prisma from "../config/db";
import { IPassenger } from "../types/Bus";

export async function createPassenger(busId: number, body: IPassenger[]) {
  const date = moment().format("YYYY-MM-DD");
  console.log(
    body.map((item) => ({
      ...item,
      date,
      busScheduleId: busId,
    })),
  );
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
