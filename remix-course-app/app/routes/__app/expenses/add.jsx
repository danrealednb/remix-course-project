import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

// export const meta = () => {
//     return [
//       { title: "Add Expenses" },
//       { name: "description", content: "Add Expenses Page" },
//     ];
//   };

export default function AddExpensesPage() {
  const navigate = useNavigate()
  function closeHandler() {
    // navigate programmatically
    navigate('..')
  }
  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}
