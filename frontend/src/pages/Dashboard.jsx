import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import SummaryCard from "../components/SummaryCard";
import { useState, useEffect } from "react";
import { getExpenses } from "../services/expenseService";
import ExpenseList from "../components/ExpenseList";

function Dashboard() {
  const [editingExpense, setEditingExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);

  async function fetchExpenses() {
    const expenses = await getExpenses();
    setExpenses(expenses);
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

        <ExpenseList
          expenses={expenses}
          onExpenseDeleted={fetchExpenses}
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
