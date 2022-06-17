import { useContext } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";

function AllExpenses() {
  const { allExpenses } = useContext(ExpensesContext);

  return (
    <View style={styles.container}>
      {/* <Pressable> */}
      <FlatList
        data={allExpenses}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <View style={styles.infoContainer}>
                <Text>{item.title}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text>{item.amount}$</Text>
              </View>
            </View>
          );
        }}
      />
      {/* </Pressable> */}
    </View>
  );
}

export default AllExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: GlobalStyles.colors.metallicGrey,
  },
  listItem: {
    backgroundColor: GlobalStyles.colors.blueviolet,
    // width: "100%",
    marginVertical: 8,
    padding: 8,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 6,
  },
});
