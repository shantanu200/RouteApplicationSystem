import { faker } from "@faker-js/faker";
import cities from "../data/Cities.json";
import { getLocationsFromLatLng } from "../functions/Location.function";
import moment from "moment";

export const createFakeCitiesFunc = () => {
  let fakeCities = [];

  for (let i = 0; i < 100; i++) {
    let randomIdx = Math.floor(Math.random() * cities.length);
    fakeCities.push({
      cityId: randomIdx,
      operatorId: 1,
    });
  }

  return fakeCities;
};

export const createFakeOperatorsFunc = async () => {
  let fakeOperators = [];
  for (let i = 0; i < 10; i++) {
    const data = faker.location.nearbyGPSCoordinate({
      origin: [21.11407163764712, 79.10356967975977],
      radius: 10,
      isMetric: true,
    });
    const locations = await getLocationsFromLatLng(data[0], data[1]);

    fakeOperators.push({
      name: faker.company.name(),
      email: faker.internet.email(),
      contact: faker.phone.number(),
      password: "1234",
      latitude: data[0],
      longitude: data[1],
      address: locations[0]?.address,
    });
  }
  return fakeOperators;
};

export const createFakeOperatorsCityPointsFunc = async () => {
  let fakeOperators = [];
  let operator: number = 4;
  for (let i = 208; i <= 226; i += 2) {
    const data = faker.location.nearbyGPSCoordinate({
      origin: [21.11407163764712, 79.10356967975977],
      radius: 10,
      isMetric: true,
    });
    const locations = await getLocationsFromLatLng(data[0], data[1]);
    console.log(locations[0]);
    fakeOperators.push({
      cityId: i,
      latitude: locations[0]?.location?.lat,
      longitude: locations[0]?.location?.lng,
      location: locations[0]?.address,
      address: locations[0]?.address,
    });
  }
  return fakeOperators;
};

export const createFakeBusesFunc = async () => {
  const fakeBuses = [];
  let operator: number = 3;
  for (let i = 206; i <= 226; i += 2) {
    for (let j = i + 1; j <= 225; j += 2) {
      fakeBuses.push({
        operatorId: operator,
        name: `Bus-${i}-${j}`,
        number: faker.vehicle.vrm(),
        boardingCityId: i,
        droppingCityId: j,
      });
    }
    operator++;
  }

  return fakeBuses;
};

export const createFakeBusScheduleFunc = async () => {
  const fakeBusSchedule = [];

  for (let i = 10; i <= 64; i++) {
    fakeBusSchedule.push({
      busId: i,
      date: moment(faker.date.recent()).format("YYYY-MM-DD"),
      time: moment(faker.date.recent()).format("HH:mm"),
    });
  }

  return fakeBusSchedule;
};
