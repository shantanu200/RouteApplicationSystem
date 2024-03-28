import { GOOGLE_MAP_KEY, MAPTYPE } from "../constants";
import axios from "axios";
import { ILocation } from "../types/Location";
import prisma from "../config/db";

export async function getLocations(query: string, type?: string) {
  try {
    const requestUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?input=${query}&key=${GOOGLE_MAP_KEY}`;

    const response = await axios.get(requestUrl);
    let locations;
    if (response.data.results?.length > 0) {
      locations = response.data.results.map((location: ILocation) => ({
        name: location?.name,
        address: location?.formatted_address,
        location: location?.geometry?.location,
      }));
    } else {
      locations = [];
    }

    return locations;
  } catch (error) {
    throw error;
  }
}

export async function getLocationsFromLatLng(lat: number, lng: number) {
  try {
    const requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_KEY}`;

    const response = await axios.get(requestUrl);
    let locations;
    if (response.data.results?.length > 0) {
      locations = response.data.results.map((location: ILocation) => ({
        address: location?.formatted_address,
        location: location?.geometry?.location,
      }));
    } else {
      locations = [];
    }

    return locations;
  } catch (error) {
    throw error;
  }
}

export async function getNearestSuggestion({
  lat,
  lng,
  date,
  droppingCity,
  radius = 20,
  page = 1,
  limit = 10,
}: {
  lat: number;
  lng: number;
  date: string;
  droppingCity: number;
  radius?: number;
  page?: number;
  limit?: number;
}) {
  const query = await prisma.$queryRaw`
 SELECT
  COUNT(p.id)::integer AS total_passengers,
  bs.*,
  b.id AS bus_id,
  op.name AS operator_name,
  b."operatorId" AS operator_id,
  b."boardingCityId" AS operator_boarding_city_id,
  b."droppingCityId" AS operator_dropping_city_id,
  c.name AS dropping_city_name,
  bc.id AS boarding_city_id,
  bc.name AS boarding_city_name,
  subquery.min_distance
FROM (
  SELECT
    bs.id AS schedule_id,
    MIN(
      6371 * acos(
        cos(radians(${lat})) *
        cos(radians(ocp.latitude)) *
        cos(radians(ocp.longitude) - radians(${lng})) +
        sin(radians(${lat})) *
        sin(radians(ocp.latitude))
      )
    ) AS min_distance
  FROM
    prisma."BusSchedule" bs
    JOIN prisma."Bus" b ON bs."busId" = b.id
    JOIN prisma."OperatorCity" bc ON b."boardingCityId" = bc.id
    JOIN prisma."OperatorCity" oc ON b."droppingCityId" = oc.id
    JOIN prisma."City" c ON c.id = oc."cityId"
    JOIN prisma."OperatorCityPoints" ocp ON bc.id = ocp."cityId"
  WHERE
    bs.date = ${date} AND c.id = ${droppingCity}
  GROUP BY
    bs.id
) subquery
JOIN prisma."BusSchedule" bs ON bs.id = subquery.schedule_id
JOIN prisma."Bus" b ON bs."busId" = b.id
JOIN prisma."Operator" op ON b."operatorId" = op.id
JOIN prisma."OperatorCity" oc ON oc.id = b."droppingCityId"
JOIN prisma."OperatorCity" obc ON obc.id = b."boardingCityId"
JOIN prisma."City" c ON c.id = oc."cityId"
JOIN prisma."City" bc ON bc.id = obc."cityId"
LEFT JOIN prisma."Passenger" p ON bs.id = p."busScheduleId"
WHERE
  c.id = ${droppingCity} AND subquery.min_distance <= ${radius}
GROUP BY
  bs.id, b.id, op.id, oc.id, obc.id, c.id, bc.id, subquery.min_distance
ORDER BY
  subquery.min_distance, bs.time
LIMIT ${Number(limit)} OFFSET ${Number(limit) * (Number(page) - 1)};
  `;

  return query;
}
