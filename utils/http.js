import axios from "axios";
const API_URL =
  "https://expense-tracker-rn-app-ce9c9-default-rtdb.firebaseio.com";

export async function createExpense(expenseData) {
  const response = await axios.post(API_URL + "/expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function getExpenses() {
  const response = await axios.get(API_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const element = response.data[key];
    const expenseObj = {
      id: key,
      amount: element.amount,
      title: element.title,
    };
    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id, expenseData) {
  const { title, amount } = expenseData;
  return axios.put(API_URL + `/expenses/${id}.json`, { title, amount });
}

export async function deleteExpense(id) {
  return axios.delete(API_URL + `/expenses/${id}.json`);
}
