import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "~/data/validation.server";
import { requireUserSession } from "../../../data/auth.server";

// export const meta = () => {
//     return [
//       { title: "Add Expenses" },
//       { name: "description", content: "Add Expenses Page" },
//     ];
//   };

export default function AddExpensesPage() {
  const navigate = useNavigate();
  function closeHandler() {
    // navigate programmatically
    navigate("..");
  }
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

export async function action({ request }) {
  const userId = await requireUserSession(request)
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  // console.log(expenseData, formData)

  try {
    validateExpenseInput(expenseData)
  } catch (error) {
    return error;
  }
  
  await addExpense(expenseData, userId);
  return redirect("/expenses");
}
