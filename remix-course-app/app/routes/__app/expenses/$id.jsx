import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { useNavigate } from "@remix-run/react";

// export const meta = () => {
//     return [
//       { title: "Expenses Update" },
//       { name: "description", content: "Expenses Update Page" },
//     ];
//   };

export default function UpdateExpensesPage() {
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
