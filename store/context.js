import { createContext, useState } from "react";

export const ExpensesContext = createContext();

export default function ExpensesContextProvider({ children }) {
  const [allExpenses, setAllExpenses] = useState([
    {
      id: 1,
      title: "ice cream",
      amount: 25,
    },
  ]);

  return (
    <ExpensesContext.Provider value={{ allExpenses, setAllExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
}
