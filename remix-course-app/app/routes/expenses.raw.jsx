// export const meta = () => {
//     return [
//       { title: "Expenses Raw" },
//       { name: "description", content: "Expenses Raw Page" },
//     ];
//   };
  
  // export default function ExpensesRawPage() {
  //   return (
  //    <h1>Expenses Raw Page</h1>
  //   );
  // }
  
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


  export function loader() {
    return DUMMY_EXPENSES
  }