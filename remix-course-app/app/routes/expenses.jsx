// shared layout for expenses
// files in expenses folder will use this layout
// if routes in folder dont need layout, move it ouside the expenses folder

const DUMMY_EXPENSES = [
    {
      id: 'e1',
      title: 'First Expense',
      amount: 12.99,
      date: new Date().toISOString()
    },
    {
      id: 'e2',
      title: 'Second Expense',
      amount: 7.95,
      date: new Date().toISOString()
    }
  ]


import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css";
import ExpensesList from "~/components/expenses/ExpensesList";

export default function ExpensesLayout() {
  return (
    <>
      <Outlet />
      <main>
        {/* <p>Shared element!</p> */}
        <ExpensesList expenses={DUMMY_EXPENSES}/>
      </main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyles }];
}
