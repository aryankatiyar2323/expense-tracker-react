import ExpenseItem from "./ExpenseItem";

function ExpenseList({
  expenses,
  onExpenseDeleted,
  onEdit,
}) {

  return (

    <section className="expense-list">

      {expenses.map((expense) => (

        <ExpenseItem
          key={expense.id}
          expense={expense}
          onExpenseDeleted={onExpenseDeleted}
          onEdit={onEdit}
        />

      ))}

    </section>

  );

}

export default ExpenseList;