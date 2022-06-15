import { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { ExpensesContext } from "../store/context";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(undefined);

  const { setAllExpenses } = useContext(ExpensesContext);

  return (
    <View>
      <Text>AddExpense</Text>
      <TextInput value={title} onChangeText={setTitle} />
      <TextInput value={amount} onChangeText={setAmount} />
      <Button
        onPress={() => {
          console.log("this is title", title);
          setAllExpenses((prevState) => [
            ...prevState,
            { id: Math.random(), title: title, amount: 234234 },
          ]);
        }}
        title="submit"
      />
    </View>
  );
};

export default AddExpense;
