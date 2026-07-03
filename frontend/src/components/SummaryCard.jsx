function SummaryCard({
  expenses,
  totalThisMonth,
  totalTransactionsThisMonth,
}) {
  const expenseSum = expenses.reduce((accumulator, expense) => {
    return accumulator + Number(expense.amount);
  }, 0);

  return (
    <section className="summary-grid">
      <div className="summary-card">
        <span className="summary-icon">💰</span>

        <div>
          <h3>Total Expense</h3>

          <h2>₹{expenseSum.toLocaleString("en-IN")}</h2>
        </div>
      </div>

      <div className="summary-card">
        <span className="summary-icon">📄</span>

        <div>
          <h3>Total Entries</h3>

          <h2>{expenses.length}</h2>
        </div>
      </div>

      <div className="summary-card">
        <span className="summary-icon">📅</span>

        <div>
          <h3>This Month</h3>

          <h2>₹{totalThisMonth.toLocaleString("en-IN")}</h2>
        </div>
      </div>

      <div className="summary-card">
        <span className="summary-icon">🧾</span>

        <div>
          <h3>Transactions</h3>

          <h2>{totalTransactionsThisMonth}</h2>
        </div>
      </div>
    </section>
  );
}

export default SummaryCard;