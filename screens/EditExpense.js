import { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { ExpensesContext } from "../store/context";

export default function EditExpense({ route, navigation }) {
  const data = route.params?.data;

  const [title, setTitle] = useState(data.title);
  const [amount, setAmount] = useState(data.amount);

  const { allExpenses, setAllExpenses } = useContext(ExpensesContext);

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
        onPress={() => {
          const updatedArr = allExpenses.map((el) => {
            if (el.id === data.id) {
              return { ...el, title, amount };
            } else return el;
          });
          setAllExpenses(updatedArr);
          navigation.navigate("All");
        }}
        disabled={title === data.title && amount === data.amount}
      />
      <Button
        title="delete expense"
        color="#f194ff"
        onPress={() => {
          setAllExpenses((prevArr) =>
            prevArr.filter((el) => el.id !== data.id)
          );
          navigation.navigate("All");
        }}
      />
    </View>
  );
}
