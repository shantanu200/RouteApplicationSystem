import prisma from "../config/db";

export async function getCities(){
    return await prisma.city.findMany();
}