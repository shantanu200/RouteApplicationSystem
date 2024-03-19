import prisma from "../config/db";
import { IBusCity, IBusPoint } from "../types/Bus";

export async function createBusCity(operatorId: number, body: IBusCity) {
  return await prisma.operatorCity.create({
    data: {
      operatorId,
      cityId: body.cityId,
    },
  });
}

export async function getBusCity(id: number) {
  return await prisma.operatorCity.findUnique({
    where: {
      id: id,
    },
    include: {
      OperatorCityPoints: true,
      city: {
        select: {
          name: true,
        },
      },
      busBoardingCity: {
        select: {
          name: true,
          number: true,
          droppingCity: true,
        },
      },
      busDroppingCity: {
        select: {
          name: true,
          number: true,
          boardingCity: true,
        },
      },
    },
  });
}

export async function getBusCities() {
  return await prisma.operatorCity.findMany();
}

export async function getOperatorCity(id: number) {
  return await prisma.operatorCity.findMany({
    where: {
      operatorId: id,
    },
    include: {
      city: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          busBoardingCity: true,
          busDroppingCity: true,
          OperatorCityPoints: true,
        },
      },
    },
  });
}

export async function updateBusCity(id: number, city: number) {
  return await prisma.operatorCity.update({
    where: {
      id,
    },
    data: {
      cityId: city,
    },
  });
}

export async function deleteBusCity(id: number) {
  return await prisma.operatorCity.delete({
    where: {
      id,
    },
  });
}

export async function createBusPoint(cityId: number, point: IBusPoint) {
  return await prisma.operatorCityPoints.create({
    data: {
      ...point,
      cityId,
    },
  });
}

export async function getOperatorCityPoints(operatorId: number) {
  return await prisma.operator.findUnique({
    where: {
      id: operatorId,
    },
    include: {
      OperatorCity: {
        select: {
          city: true,
          OperatorCityPoints: true,
        },
      },
    },
  });
}

export async function updateBusPoint(pointId: number, point: IBusPoint) {
  return await prisma.operatorCityPoints.update({
    where: {
      id: pointId,
    },
    data: {
      ...point,
    },
  });
}
