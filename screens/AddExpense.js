import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverlay";
import { createExpense } from "../utils/http";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../UI/Button";

const AddExpense = ({ navigation }) => {
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    expenseDate: "",
  });

  const [error, setError] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { setAllExpenses } = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (data) => {
    const { title, amount, expenseDate } = data;

    setIsSubmitting(true);

    try {
      const id = await createExpense({ title, amount, expenseDate });

      setAllExpenses((prevState) => [
        { title: title, amount: amount, expenseDate: expenseDate, id: id },
        ...prevState,
      ]);
      setIsSubmitting(false);
      navigation.goBack();
    } catch (err) {
      setIsSubmitting(false);
      setError("Could not create expense. Please check connection.");
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedDate =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate();
    setDate(currentDate);
    setExpenseData((prevState) => {
      return {
        ...prevState,
        expenseDate: formattedDate,
      };
    });
    setShow(false);
  };

  const inputChangedHandler = (fieldIdentifier, enteredValue) => {
    setExpenseData((prevState) => {
      return {
        ...prevState,
        [fieldIdentifier]: enteredValue,
      };
    });
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
    <View style={styles.container}>
      <TextInput
        value={expenseData.title}
        onChangeText={inputChangedHandler.bind(this, "title")}
        placeholder="input expense title"
        style={styles.input}
      />
      <TextInput
        value={expenseData.amount}
        onChangeText={inputChangedHandler.bind(this, "amount")}
        placeholder="input expense amount"
        style={styles.input}
      />

      <Text style={styles.input}>{expenseData.expenseDate}</Text>

      <Button
        title="select date"
        onPress={() => {
          setShow(true);
        }}
        type="secondary"
      />
      {/* <Button title="select time" onPress={setShow(true)} /> */}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <Button
        onPress={() => {
          const { title, amount, expenseDate } = expenseData;

          if (title && !isNaN(amount) && expenseDate) {
            submitHandler({ title, amount, expenseDate });
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
  secondaryButton: {
    backgroundColor: "transparent",
  },
  error: {
    color: "#fff",
    marginVertical: 8,
    fontWeight: "bold",
  },
});
