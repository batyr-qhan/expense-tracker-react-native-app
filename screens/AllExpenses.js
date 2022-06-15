import { useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ExpensesContext } from "../store/context";

function AllExpenses() {
  const { allExpenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      <Text>This is all expenses page</Text>

      <FlatList
        data={allExpenses}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
