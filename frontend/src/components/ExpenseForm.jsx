import { useState, useEffect } from "react";
import { addExpense, updateExpense } from "../services/expenseService";

function ExpenseForm({ onExpenseAdded, editingExpense, onEditComplete }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date.split("T")[0],
      });
    }
  }, [editingExpense]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, formData);
        onEditComplete();
      } else {
        await addExpense(formData);
      }

      onExpenseAdded();

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
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

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Category</option>
        <option value="Food">🍔 Food</option>
        <option value="Travel">✈ Travel</option>
        <option value="Shopping">🛍 Shopping</option>
        <option value="Bills">💡 Bills</option>
        <option value="Entertainment">🎮 Entertainment</option>
        <option value="Health">❤️ Health</option>
        <option value="Other">📦 Other</option>
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />

      <button type="submit">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
