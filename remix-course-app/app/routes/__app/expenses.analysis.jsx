// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     title: 'First Expense',
//     amount: 12.99,
//     date: new Date().toISOString()
//   },
//   {
//     id: 'e2',
//     title: 'Second Expense',
//     amount: 7.95,
//     date: new Date().toISOString()
//   }
// ]

import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";
import { getExpenses } from "~/data/expenses.server";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import Error from "~/components/util/Error";
import { requireUserSession } from "../../data/auth.server";

// export const meta = () => {
//     return [
//       { title: "Expenses Analysis" },
//       { name: "description", content: "Expenses Analysis Page" },
//     ];
//   };

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({request}) {
  console.log("EXPENSES ANALYSIS LOADER");
  const userId = await requireUserSession(request)
  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: "Could not load expense for requested analysis." },
      { status: 404, statusText: "Expenses not found" }
    );
  }
  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>{caughtResponse.data?.message || "Something went wrong - could not load expenses"}</p>
      </Error>
    </main>
  );
}
