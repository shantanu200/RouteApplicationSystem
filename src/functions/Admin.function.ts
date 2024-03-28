import prisma from "../config/db";
import cities from "../data/Cities.json";
import {
  createFakeBusScheduleFunc,
  createFakeBusesFunc,
  createFakeCitiesFunc,
  createFakeOperatorsCityPointsFunc,
  createFakeOperatorsFunc,
} from "../utils/fake.util";

export async function dumpCities() {
  let uniqueCities = new Set([...cities]);
  return await prisma.city.createMany({
    data: Array.from(uniqueCities).map((item) => ({
      name: item,
    })),
  });
}

export async function createFakeCities() {
  const body = createFakeCitiesFunc();
  console.log(body);
  return await prisma.operatorCity.createMany({
    data: body,
  });
}

export async function createFakeOperators() {
  const body = await createFakeOperatorsFunc();
  console.log(body);
  return await prisma.operator.createMany({
    data: body,
  });
}

export async function createFakeOperatorCites() {
  let body = [];

  for (let i = 4; i <= 13; i++) {
    body.push({
      operatorId: i,
      cityId: 695,
    });
    body.push({
      operatorId: i,
      cityId: 484,
    });
  }

  return await prisma.operatorCity.createMany({
    data: body,
  });
}

export async function createFakeOperatorCitiesPoint() {
  let body = await createFakeOperatorsCityPointsFunc();

  console.log(body);

  return await prisma.operatorCityPoints.createMany({
    data: body,
  });
}

export async function createFakeBuses() {
  let body = await createFakeBusesFunc();

  return await prisma.bus.createMany({
    data: body,
  });
}
export async function createFakeBusesSchedule() {
  let body = await createFakeBusScheduleFunc();
  return await prisma.busSchedule.createMany({
    data: body,
  });
}
