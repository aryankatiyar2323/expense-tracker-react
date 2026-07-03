import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import SummaryCard from "../components/SummaryCard";
import { useState, useEffect } from "react";
import { getExpenses } from "../services/expenseService";
import ExpenseList from "../components/ExpenseList";
import ConfirmModal from "../components/ConfirmModal";
import { deleteExpense } from "../services/expenseService";
import toast from "react-hot-toast";

function Dashboard() {
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const search = searchTerm.trim().toLowerCase();

  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.title.toLowerCase().includes(search) ||
      expense.category.toLowerCase().includes(search)
    );
  });

  async function fetchExpenses() {
    const expenses = await getExpenses();
    setExpenses(expenses);
  }

  async function handleDelete() {
    try {
      await deleteExpense(expenseToDelete.id);

      await fetchExpenses();

      setExpenseToDelete(null);

      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete expense");
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <Navbar />

      <main className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <p>Manage all your expenses in one place.</p>
        </div>

        <SummaryCard expenses={expenses} />

        {showForm && (
          <div
            className="modal-overlay"
            onClick={() => {
              setShowForm(false);

              setEditingExpense(null);
            }}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <ExpenseForm
                onExpenseAdded={() => {
                  fetchExpenses();

                  setShowForm(false);
                }}
                editingExpense={editingExpense}
                onEditComplete={() => {
                  setEditingExpense(null);

                  setShowForm(false);
                }}
              />
            </div>
          </div>
        )}

        {expenseToDelete && (
          <ConfirmModal
            title="Delete Expense"
            message={
              <>
                Are you sure you want to delete{" "}
                <strong>{expenseToDelete.title}</strong>?
              </>
            }
            onCancel={() => {
              setExpenseToDelete(null);
            }}
            onConfirm={handleDelete}
          />
        )}

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ExpenseList
          expenses={filteredExpenses}
          onDelete={(expense) => {
            setExpenseToDelete(expense);
          }}
          onEdit={(expense) => {
            setEditingExpense(expense);

            setShowForm(true);
          }}
        />

        <button className="floating-btn" onClick={() => setShowForm(true)}>
          +
        </button>
      </main>
    </>
  );
}

export default Dashboard;
