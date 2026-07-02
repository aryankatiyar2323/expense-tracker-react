import { deleteExpense } from "../services/expenseService";

function ExpenseItem({ expense, onExpenseDeleted, onEdit }) {
  async function handleDelete() {
    try {
      await deleteExpense(expense.id);

      onExpenseDeleted();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="expense-card">
      <div className="expense-card-header">
        <div>
          <h3>{expense.title}</h3>

          <span className="category-pill">{expense.category}</span>
        </div>

        <div className="expense-price">
          ₹{Number(expense.amount).toLocaleString("en-IN")}
        </div>
      </div>

      <div className="expense-card-footer">
        <p>
          📅{" "}
          {new Date(expense.date).toLocaleDateString("en-IN", {
            day: "2-digit",

            month: "short",

            year: "numeric",
          })}
        </p>

        <div className="expense-actions">
          <button
            className="edit-btn"
            onClick={() => {
              onEdit(expense);
            }}
          >
            ✏ Edit
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
