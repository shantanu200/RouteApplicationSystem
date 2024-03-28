import { JwtTokenSignatureMismatched } from "hono/utils/jwt/types";
import prisma from "../config/db";
import { IUser } from "../types/User";

export async function createUser(body: IUser) {
  return await prisma.user.create({
    data: body,
  });
}

export async function getUser(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Booking: {
        select: {
          id: true,
          date: true,
          createdAt: true,
          status: true,
          boardingPoint: {
            select: {
              location: true,
              address: true,
            },
          },
          BusSchedule: {
            select: {
              time: true,
              bus: {
                select: {
                  boardingCity: {
                    select: {
                      city: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                  droppingCity: {
                    select: {
                      city: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getUserByContact(contact: string) {
  return await prisma.user.findFirst({
    where: {
      contact,
    },
  });
}

export async function updateUser(id: number, body: IUser) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: body,
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}

export async function getUsersBooking(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Booking: true,
    },
  });
}
