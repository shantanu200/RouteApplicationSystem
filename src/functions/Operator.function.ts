import prisma from "../config/db";
import { IOperator } from "../types/Operator";

export async function createOperator(operator: IOperator) {
  return await prisma.operator.create({
    data: operator,
  });
}

export async function getAllOperators() {
  return await prisma.operator.findMany();
}

export async function getOperator(id: number) {
  return await prisma.operator.findUnique({
    where: {
      id,
    },
  });
}

export async function getOperatorByEmail(email: string) {
  return await prisma.operator.findUnique({
    where: {
      email,
    },
  });
}

export async function updateOperator(id: number, operator: IOperator) {
  return await prisma.operator.update({
    where: {
      id,
    },
    data: operator,
  });
}

export async function deleteOperator(id: number) {
  return await prisma.operator.delete({ where: { id } });
}

export async function getOperatorAnalytics(id: number) {
  //1. Total Buses
  //3. Total Cities
  //4. Total Active Bookings
  //
  console.log(id, "id");
  return await prisma.operator.findUnique({
    where: {
      id,
    },
  });
}
