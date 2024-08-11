import React, { useState } from "react";

const expenseCategories = [
  "Accommodation",
  "Transportation",
  "Food",
  "Activities",
  "Shopping",
  "Other",
];

function BudgetTracker({ budget, updateBudget }) {
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Accommodation",
  });

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount) {
      const updatedBudget = {
        ...budget,
        expenses: [
          ...(budget.expenses || []),
          {
            ...newExpense,
            id: Date.now(),
            amount: parseFloat(newExpense.amount),
          },
        ],
      };
      updateBudget(updatedBudget);
      setNewExpense({ description: "", amount: "", category: "Accommodation" });
    }
  };

  const handleDeleteExpense = (id) => {
    const updatedBudget = {
      ...budget,
      expenses: budget.expenses.filter((expense) => expense.id !== id),
    };
    updateBudget(updatedBudget);
  };

  const totalExpenses = budget.expenses
    ? budget.expenses.reduce((total, expense) => total + expense.amount, 0)
    : 0;
  const remainingBudget = budget.totalBudget - totalExpenses;

  return (
    <div className="budget-tracker">
      <h3>Budget Tracker</h3>
      <div className="budget-summary">
        <p>Total Budget: ${budget.totalBudget}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Remaining: ${remainingBudget.toFixed(2)}</p>
      </div>
      <div className="add-expense-form">
        <input
          type="text"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
          placeholder="Expense description"
        />
        <input
          type="number"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          placeholder="Amount"
        />
        <select
          value={newExpense.category}
          onChange={(e) =>
            setNewExpense({ ...newExpense, category: e.target.value })
          }
        >
          {expenseCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div className="expense-list">
        <h4>Expenses</h4>
        {expenseCategories.map((category) => (
          <div key={category} className="category-section">
            <h5>{category}</h5>
            <ul>
              {budget.expenses &&
                budget.expenses
                  .filter((expense) => expense.category === category)
                  .map((expense) => (
                    <li key={expense.id}>
                      <span>{expense.description}</span>
                      <span>${expense.amount.toFixed(2)}</span>
                      <button onClick={() => handleDeleteExpense(expense.id)}>
                        Delete
                      </button>
                    </li>
                  ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BudgetTracker;
