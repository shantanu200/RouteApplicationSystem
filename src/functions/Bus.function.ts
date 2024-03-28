import prisma from "../config/db";
import { IBus, IBusPoint, IBusSchedule } from "../types/Bus";
import moment from "moment";

export async function createBus(operatorId: number, body: IBus) {
  return await prisma.bus.create({
    data: {
      ...body,
      operatorId,
    },
  });
}

export async function getBuses() {
  return await prisma.bus.findMany();
}

export async function getBus(id: number) {
  return await prisma.bus.findUnique({
    where: {
      id,
    },
    include: {
      boardingCity: {
        select: {
          city: true,
          OperatorCityPoints: true,
        },
      },
      droppingCity: {
        select: {
          city: true,
          OperatorCityPoints: true,
        },
      },
      busSchedule: {
        select: {
          id: true,
          date: true,
          time: true,
          _count: {
            select: {
              passenger: true,
            },
          },
        },
      },
    },
  });
}

export async function operatorBuses(operatorId: number, query: string) {
  let filter = {};

  if (query !== "") {
    filter = {
      AND: [
        {
          operatorId,
        },
        {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              number: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              boardingCity: {
                city: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              droppingCity: {
                city: {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
      ],
    };
  } else {
    filter = {
      operatorId,
    };
  }
  return await prisma.bus.findMany({
    where: filter,
    include: {
      boardingCity: {
        select: {
          city: true,
        },
      },
      droppingCity: {
        select: {
          city: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteBus(busId: number) {
  return await prisma.bus.delete({
    where: {
      id: busId,
    },
  });
}

export async function createBusSchedule(busId: number, body: IBusSchedule) {
  return await prisma.busSchedule.create({
    data: {
      ...body,
      busId,
    },
  });
}

export async function getBusSchedule(busId: number) {
  return await prisma.busSchedule.findMany({
    where: {
      busId,
    },
    include: {
      bus: {
        select: {
          name: true,
          number: true,
          boardingCity: {
            select: {
              city: true,
              OperatorCityPoints: true,
            },
          },
          droppingCity: {
            select: {
              city: true,
            },
          },
        },
      },
      _count: {
        select: {
          passenger: true,
        },
      },
    },
  });
}

export async function getBusSingleSchedule(id: number) {
  return await prisma.busSchedule.findUnique({
    where: {
      id,
    },
    include: {
      bus: {
        select: {
          name: true,
          number: true,
          boardingCity: {
            select: {
              city: true,
              OperatorCityPoints: true,
            },
          },
          droppingCity: {
            select: {
              city: true,
            },
          },
        },
      },
      passenger: {
        select: {
          name: true,
          contact: true,
          seat: true,
          boardingPoint: {
            select: {
              location: true,
              time: true,
            },
          },
        },
      },
    },
  });
}

export async function getBusScheduleByDate(
  operatorId: number,
  date: string,
  query: string,
) {
  if (!date) {
    date = moment().format("YYYY-MM-DD");
  }

  const defaultFilter = {
    operatorId,
    busSchedule: {
      some: {
        date,
      },
    },
  };
  let filter = {};
  if (query !== "") {
    console.log("Query", query);
    filter = {
      operatorId,
      busSchedule: {
        some: {
          date,
        },
      },
      bus: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      //   {
      //     OR: [
      //       {
      //         bus: {
      //           name: {
      //             contains: query,
      //             mode: "insensitive",
      //           },
      //         },
      //       },
      //       {
      //         bus: {
      //           number: {
      //             contains: query,
      //             mode: "insensitive",
      //           },
      //         },
      //       },
      //       {
      //         bus: {
      //           boardingCity: {
      //             city: {
      //               name: {
      //                 contains: query,
      //                 mode: "insensitive",
      //               },
      //             },
      //           },
      //         },
      //       },
      //       {
      //         bus: {
      //           droppingCity: {
      //             city: {
      //               name: {
      //                 contains: query,
      //                 mode: "insensitive",
      //               },
      //             },
      //           },
      //         },
      //       },
      //       {
      //         bus: {
      //           busSchedule: {
      //             some: {
      //               date,
      //               passenger: {
      //                 some: {
      //                   name: {
      //                     contains: query,
      //                     mode: "insensitive",
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       },
      //       {
      //         bus: {
      //           busSchedule: {
      //             some: {
      //               date,
      //               passenger: {
      //                 some: {
      //                   seat: {
      //                     contains: query,
      //                     mode: "insensitive",
      //                   },
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       },
      //     ],
      //   },
    };
  } else {
    filter = {
      operatorId,
      busSchedule: {
        some: {
          date,
        },
      },
    };
  }

  console.log(JSON.stringify(filter, null, 2));
  return await prisma.bus.findMany({
    where: filter,
    include: {
      busSchedule: {
        where: {
          date,
        },
        select: {
          id: true,
          time: true,
          date: true,
          passenger: {
            select: {
              id: true,
              name: true,
              contact: true,
              seat: true,
              date: true,
              boardingPoint: {
                select: {
                  location: true,
                  time: true,
                },
              },
            },
          },
          _count: {
            select: {
              passenger: true,
            },
          },
        },
      },
    },
  });
}

export async function getOperatorTodaySchedule(operatorId: number) {
  const today = moment().format("YYYY-MM-DD");
  return await prisma.busSchedule.findMany({
    where: {
      bus: {
        operatorId,
      },
      date: today,
    },
    include: {
      bus: {
        select: {
          name: true,
          number: true,
          boardingCity: {
            select: {
              city: true,
              OperatorCityPoints: true,
            },
          },
          droppingCity: {
            select: {
              city: true,
              OperatorCityPoints: true,
            },
          },
        },
      },
    },
  });
}

export async function deleteSchedule(scheduleId: number) {
  return await prisma.busSchedule.delete({
    where: {
      id: scheduleId,
    },
  });
}
