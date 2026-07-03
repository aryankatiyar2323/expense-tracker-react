import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import SummaryCard from "../components/SummaryCard";
import { useState, useEffect } from "react";
import { getExpenses } from "../services/expenseService";
import ExpenseList from "../components/ExpenseList";
import ConfirmModal from "../components/ConfirmModal";
import { deleteExpense } from "../services/expenseService";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import BudgetTracker from "../components/BudgetTracker";

const filterCategoryOptions = [
  { value: "", label: "All Categories" },
  { value: "Food", label: "🍔 Food" },
  { value: "Travel", label: "✈️ Travel" },
  { value: "Shopping", label: "🛍️ Shopping" },
  { value: "Bills", label: "💡 Bills" },
  { value: "Entertainment", label: "🎮 Entertainment" },
  { value: "Health", label: "❤️ Health" },
  { value: "Other", label: "📦 Other" },
];

function Dashboard() {
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const search = searchTerm.trim().toLowerCase();

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.title.toLowerCase().includes(search) ||
      expense.category.toLowerCase().includes(search);

    const matchesCategory =
      !selectedCategory ||
      selectedCategory.value === "" ||
      expense.category === selectedCategory.value;

    const matchesDate =
      !selectedDate ||
      expense.date === selectedDate.toISOString().split("T")[0];

    return matchesSearch && matchesCategory && matchesDate;
  });

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const totalThisMonth = thisMonthExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0,
  );

  const totalTransactionsThisMonth = thisMonthExpenses.length;

  const monthlyBudget = 20000;

  const remainingBudget = monthlyBudget - totalThisMonth;

  const budgetPercentage = Math.min(
    (totalThisMonth / monthlyBudget) * 100,
    100,
  );

  const budgetStatus =
    totalThisMonth > monthlyBudget
      ? "Exceeded"
      : totalThisMonth > monthlyBudget * 0.7
        ? "Warning"
        : "Safe";

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


        <SummaryCard
          expenses={expenses}
          totalThisMonth={totalThisMonth}
          totalTransactionsThisMonth={totalTransactionsThisMonth}
          monthlyBudget={monthlyBudget}
          remainingBudget={remainingBudget}
          budgetPercentage={budgetPercentage}
          budgetStatus={budgetStatus}
        />

        <BudgetTracker
          monthlyBudget={monthlyBudget}
          totalThisMonth={totalThisMonth}
          remainingBudget={remainingBudget}
          budgetPercentage={budgetPercentage}
          budgetStatus={budgetStatus}
        />

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

        <div className="filter-bar">
          <div className="filter-item">
            <DatePicker
              selected={selectedDate}
              onChange={setSelectedDate}
              placeholderText="Filter by Date"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div className="filter-item">
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={filterCategoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="All Categories"
              isClearable
            />
          </div>

          <button
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm("");
              setSelectedDate(null);
              setSelectedCategory(null);
            }}
          >
            Clear Filters
          </button>
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
