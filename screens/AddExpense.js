import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";

const AddExpense = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { setAllExpenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="input expense title"
        style={styles.input}
      />
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="input expense amount"
        style={styles.input}
      />
      <Button
        onPress={() => {
          if (title && amount) {
            setAllExpenses((prevState) => [
              ...prevState,
              { id: Math.random(), title: title, amount: amount },
            ]);
            setTitle("");
            setAmount("");
            navigation.navigate("All");
          } else {
            setError("please fill out all fields");
          }
        }}
        title="submit"
      />
      {error ? (
        <View>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.metallicGrey,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    marginBottom: 8,
    padding: 6,
    borderRadius: 6,
  },
  button: {
    borderRadius: 6,
  },
  error: {
    color: "#fff",
    marginVertical: 8,
    fontWeight: "bold",
  },
});
