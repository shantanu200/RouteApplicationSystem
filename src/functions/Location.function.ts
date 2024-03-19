import { GOOGLE_MAP_KEY, MAPTYPE } from "../constants";
import axios from "axios";
import { ILocation } from "../types/Location";
import prisma from "../config/db";
import moment from "moment";
import { IBusSchedule } from "../types/Bus";

export async function getLocations(query: string, type?: string) {
  try {
    const requestUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${GOOGLE_MAP_KEY}&input=Pune&type=${
      type || ""
    }`;

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

export async function getNearestSuggestion({
  lat,
  lng,
  date,
  droppingCity,
  radius = 20,
}: {
  lat: number;
  lng: number;
  date: string;
  droppingCity: number;
  radius?: number;
}) {
  const query = await prisma.$queryRaw`
 SELECT
	bs.*,
	b.*,
	c.*,
	subquery.min_distance
	FROM(
		SELECT bs.id AS schedule_id,
		MIN(
              6371 * acos (
                  cos ( radians(${lat}) )
                  * cos( radians( ocp.latitude ) )
                  * cos( radians( ocp.longitude ) - radians(${lng}) )
                  + sin ( radians(${lat}) )
                  * sin( radians( ocp.latitude ) )
              )
          ) AS min_distance
		 FROM
			prisma."BusSchedule" bs
		 JOIN
			prisma."Bus" b ON bs."busId" = b.id
		 JOIN
		    prisma."OperatorCity" bc ON b."boardingCityId" = bc.id
		 JOIN
          	prisma."OperatorCity" oc ON b."droppingCityId" = oc.id
		 JOIN
		    prisma."City" c ON c.id = oc."cityId"
      JOIN
          prisma."OperatorCityPoints" ocp ON bc.id = ocp."cityId"
      WHERE
          bs.date = ${date} AND c.id = ${droppingCity}
      GROUP BY bs.id
	) subquery
	JOIN
		prisma."BusSchedule" bs ON bs.id = subquery.schedule_id
	JOIN
	    prisma."Bus" b ON bs."busId" = b.id
	JOIN
	    prisma."OperatorCity" oc ON oc.id = b."droppingCityId"
	JOIN
	 	prisma."City" c ON c.id = oc."cityId"
	WHERE
	    c.id = ${droppingCity} AND subquery.min_distance <= ${Number(radius)}
	ORDER BY
	    subquery.min_distance;
  `;

  console.log(query);
  return query;
}
