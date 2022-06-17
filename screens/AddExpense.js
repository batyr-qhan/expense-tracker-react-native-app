import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const { setAllExpenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <Text>AddExpense</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="input expense title"
      />
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="input expense amount"
      />
      <Button
        onPress={() => {
          setAllExpenses((prevState) => [
            ...prevState,
            { id: Math.random(), title: title, amount: amount },
          ]);
        }}
        title="submit"
      />
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.metallicGrey,
    alignItems: "center",
    justifyContent: "center",
  },
});
