// shared layout for expenses
// files in expenses folder will use this layout
// if routes in folder dont need layout, move it ouside the expenses folder

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     title: "First Expense",
//     amount: 12.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: "e2",
//     title: "Second Expense",
//     amount: 7.95,
//     date: new Date().toISOString(),
//   },
// ];

import { Outlet, Link, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import { FaPlus, FaDownload } from "react-icons/fa";
import { getExpenses } from "~/data/expenses.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;
  // console.log(expenses)
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          {/* resource route */}
          <a href="expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {/* <p>Shared element!</p> */}
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader() {
  console.log("EXPENSES LOADER");
  const expenses = await getExpenses();
  return expenses;
}
