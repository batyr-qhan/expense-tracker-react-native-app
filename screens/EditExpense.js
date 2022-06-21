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

  const { allExpenses, setAllExpenses } = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteHandler = async () => {
    setAllExpenses((prevArr) => prevArr.filter((el) => el.id !== expenseId));

    setIsSubmitting(true);
    await deleteExpense(expenseId);
    setIsSubmitting(false);

    navigation.navigate("All");
  };

  const updateHandler = async () => {
    const updatedArr = allExpenses.map((el) => {
      if (el.id === expenseId) {
        return { ...el, title, amount };
      }
      return el;
    });
    setAllExpenses(updatedArr);

    setIsSubmitting(true);
    await updateExpense(expenseId, { title, amount });
    setIsSubmitting(false);

    navigation.navigate("All");
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
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
