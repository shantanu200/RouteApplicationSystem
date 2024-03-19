import prisma from "../config/db";
import cities from "../data/Cities.json";

export async function dumpCities() {
  let uniqueCities = new Set([...cities]);
  return null;
  //   return await prisma.city.createMany({
  //     data: Array.from(uniqueCities).map((item) => ({
  //       name: item,
  //     })),
  //   });
}
