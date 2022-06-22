import { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { ExpensesContext } from "../store/context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { deleteExpense, updateExpense } from "../utils/http";

export default function EditExpense({ route, navigation }) {
  const data = route.params?.data;

  const [title, setTitle] = useState(data.title);
  const [amount, setAmount] = useState(data.amount);
  const [expenseId, setExpenseId] = useState(data.id);
  const [error, setError] = useState("");

  const { allExpenses, setAllExpenses } = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteHandler = async () => {
    try {
      setAllExpenses((prevArr) => prevArr.filter((el) => el.id !== expenseId));

      setIsSubmitting(true);
      await deleteExpense(expenseId);

      navigation.navigate("All");
    } catch (err) {
      setIsSubmitting(false);
      setError("Could not delete the expense. Please check network.");
    }
  };

  const updateHandler = async () => {
    try {
      setIsSubmitting(true);
      const updatedArr = allExpenses.map((el) => {
        if (el.id === expenseId) {
          return { ...el, title, amount };
        }
        return el;
      });

      setAllExpenses(updatedArr);

      await updateExpense(expenseId, { title, amount });

      navigation.navigate("All");
    } catch (err) {
      setError("Could not update...");
      setIsSubmitting(false);
      f;
    }
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={() => {
          setError("");
        }}
      />
    );
  }

  return (
    <View>
      <Text>EditExpense</Text>
      <TextInput
        value={title}
        onChangeText={(value) => {
          setTitle(value);
        }}
      />
      <TextInput
        value={amount}
        onChangeText={(value) => {
          setAmount(value);
        }}
      />
      <Button
        title="update"
        onPress={updateHandler}
        disabled={title === data.title && amount === data.amount}
      />
      <Button title="delete expense" color="#ff5000" onPress={deleteHandler} />
    </View>
  );
}
