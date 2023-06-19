import { prisma } from "./database.server";

// to generate models
// npx prisma generate
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add expense.");
  }
}

export async function getExpenses(userId) {
  if (!userId) {
    throw new Error("Failed to get expenses.");
  }
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get expenses.");
  }
}

export async function getExpense(id) {
  try {
    const expense = await prisma.expense.findFirst({
      where: { id },
    });
    return expense;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get expense.");
  }
}

export async function updateExpense(id, expenseData) {
  try {
    const expense = await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
    return expense;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update expense.");
  }
}
export async function deleteExpense(id) {
  try {
    const expense = await prisma.expense.delete({
      where: { id },
    });
    return expense;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete expense.");
  }
}
