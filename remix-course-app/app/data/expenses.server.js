import { prisma } from "./database.server";

// to generate models
// npx prisma generate
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
