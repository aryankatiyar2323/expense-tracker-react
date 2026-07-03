function BudgetTracker({
  monthlyBudget,
  totalThisMonth,
  remainingBudget,
  budgetPercentage,
  budgetStatus,
}) {
  const progressColor =
    budgetStatus === "Exceeded"
      ? "var(--coral)"
      : budgetStatus === "Warning"
        ? "var(--amber)"
        : "var(--jade)";

  return (
    <section className="budget-card">
      <div className="budget-header">
        <div>
          <h3>BUDGET</h3>
          <h2>₹{monthlyBudget.toLocaleString("en-IN")}</h2>
        </div>

        <span
          className="budget-badge"
          style={{
            background:
              budgetStatus === "Exceeded"
                ? "var(--coral-dim)"
                : budgetStatus === "Warning"
                  ? "var(--amber-dim)"
                  : "var(--jade-dim)",

            color: progressColor,
          }}
        >
          {budgetStatus}
        </span>
      </div>

      <div className="budget-progress">
        <div
          className="budget-progress-fill"
          style={{
            width: `${budgetPercentage}%`,
            background: progressColor,
          }}
        />
      </div>

      <div className="budget-footer">
        <span>
          Spent
          <strong>
            ₹{totalThisMonth.toLocaleString("en-IN")}
          </strong>
        </span>

        <span>
          Remaining
          <strong>
            ₹{remainingBudget.toLocaleString("en-IN")}
          </strong>
        </span>
      </div>
    </section>
  );
}

export default BudgetTracker;