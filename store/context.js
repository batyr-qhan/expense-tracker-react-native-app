import { createContext, useState } from "react";

export const ExpensesContext = createContext();

export default function ExpensesContextProvider({ children }) {
  const [allExpenses, setAllExpenses] = useState([]);

  return (
    <ExpensesContext.Provider value={{ allExpenses, setAllExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
}
