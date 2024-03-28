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
          id: true,
          name: true,
          number: true,
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
      busDroppingCity: {
        select: {
          id: true,
          name: true,
          number: true,
          boardingCity: {
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
  });
}

export async function getBusCities() {
  return await prisma.operatorCity.findMany();
}

export async function getOperatorCity(
  id: number,
  query: string,
  page: number = 1,
  limit: number = 10
) {
  const count = await prisma.operatorCity.count({
    where: {
      operatorId: id,
    },
  });

  const data = await prisma.operatorCity.findMany({
    where: {
      operatorId: id,
      city: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
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
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      cityId: "asc",
    },
  });

  return {
    currentPage: page,
    totalPage: Math.ceil(count / limit),
    totalDocument: count,
    data: data,
  };
}

export async function getOperatorCitiesName(operatorId: number) {
  return await prisma.operatorCity.findMany({
    where: {
      operatorId: operatorId,
    },
    select: {
      id: true,
      city: {
        select: {
          name: true,
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

export async function deleteBusPoint(pointId: number) {
  return await prisma.operatorCityPoints.delete({
    where: {
      id: pointId,
    },
  });
}
