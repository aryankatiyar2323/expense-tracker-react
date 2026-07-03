import ExpenseItem from "./ExpenseItem";

function ExpenseList({
  expenses,
  onDelete,
  onEdit,
}) {

  return (

    <section className="expense-list">

      {expenses.map((expense) => (

        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />

      ))}

    </section>

  );

}

export default ExpenseList;