import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { useNavigate } from "@remix-run/react";
import { updateExpense, deleteExpense } from "~/data/expenses.server";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "~/data/validation.server";

// export const meta = () => {
//     return [
//       { title: "Expenses Update" },
//       { name: "description", content: "Expenses Update Page" },
//     ];
//   };

export default function UpdateExpensesPage() {
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

// export async function loader({params}) {
//   console.log('EXPENSE ID LOADER')
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

export async function action({ params, request }) {
  const expenseId = params.id;

  if (request.method === "PATCH") {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    // return redirect("/expenses");
    return {deletedId: expenseId}
  }
}
