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
    <div className="mt-3">
      <h3 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-3">Budget Tracker</h3>
      <div className="budget-summary">
        <p>Total Budget: ${budget.totalBudget}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Remaining: ${remainingBudget.toFixed(2)}</p>
      </div>
      <hr className="border-2 my-4 border-[#FBFBEF]"></hr>
      <div className="mt-3">
        <input
          className="w-full rounded-lg mb-3 p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
          type="text"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
          placeholder="Expense description"
        />
        <input
          className="w-full rounded-lg mb-3 p-1 pl-3 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
          type="number"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          placeholder="Amount"
        />
        <select
          className="w-full rounded-lg p-1 text-[24px] lg:text-[36px] text-[#151E41] focus:outline-[#151E41]"
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
        <button onClick={handleAddExpense} className="w-full mt-4 font-bold border-[#FBFBEF] border-4 text-bold rounded-custom-button bg-[#151E41] py-1 text-[#FBFBEF] hover:bg-[#5A617E] hover:text-[#151E41] hover:border-[#151E41] text-[24px] lg:text-[36px]">Add Expense</button>
      </div>
      <hr className="border-2 my-4 border-[#FBFBEF]"></hr>
      <div>
        <h4 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-5">Expenses</h4>
        {expenseCategories.map((category) => (
          <div key={category} className="category-section">
            <h5>{category}</h5>
            <hr className="w-[50%] border-2 border-[#FBFBEF]" />
            <ul className="mb-3">
              {budget.expenses &&
                budget.expenses
                  .filter((expense) => expense.category === category)
                  .map((expense) => (
                    <li key={expense.id} className="flex justify-between items-center">
                      <span>{expense.description}</span>
                      <span>${expense.amount.toFixed(2)}</span>
                      <button onClick={() => handleDeleteExpense(expense.id)} className="font-bold hover:text-red-600">
                        X
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
