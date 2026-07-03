import { useState, useEffect } from "react";
import { addExpense, updateExpense } from "../services/expenseService";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const categoryOptions = [
  { value: "Food", label: "🍔 Food" },
  { value: "Travel", label: "✈ Travel" },
  { value: "Shopping", label: "🛍 Shopping" },
  { value: "Bills", label: "💡 Bills" },
  { value: "Entertainment", label: "🎮 Entertainment" },
  { value: "Health", label: "❤️ Health" },
  { value: "Other", label: "📦 Other" },
];

function ExpenseForm({ onExpenseAdded, editingExpense, onEditComplete }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date(),
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: new Date(editingExpense.date),
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        category: "",
        date: new Date(),
      });
    }
  }, [editingExpense]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const expenseData = {
      ...formData,
      date: formData.date.toISOString().split("T")[0],
    };

    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, expenseData);

        toast.success("Expense updated successfully");

        onEditComplete();
      } else {
        await addExpense(expenseData);

        toast.success("Expense added successfully");
      }

      onExpenseAdded();

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: new Date(),
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>{editingExpense ? "Update Expense" : "Add Expense"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Expense Title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />

      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuShouldBlockScroll={true}
        options={categoryOptions}
        value={categoryOptions.find(
          (option) => option.value === formData.category,
        )}
        onChange={(selectedOption) =>
          setFormData((prev) => ({
            ...prev,
            category: selectedOption?.value || "",
          }))
        }
      />

      <DatePicker
        selected={formData.date}
        onChange={(date) =>
          setFormData((prev) => ({
            ...prev,
            date,
          }))
        }
        dateFormat="dd/MM/yyyy"
        placeholderText="Select Date"
      />

      <button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
