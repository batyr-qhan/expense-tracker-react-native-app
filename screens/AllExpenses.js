import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getExpenses } from "../utils/http";

function AllExpenses({ navigation }) {
  const { allExpenses, setAllExpenses } = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);

  // console.log("all expenses rendered");

  useEffect(() => {
    console.log("context useeffect render");
    async function fetchData() {
      try {
        setIsFetching(true);
        const response = await getExpenses();
        setIsFetching(false);
        setAllExpenses(response.reverse());
      } catch (err) {
        setIsFetching(false);
        console.log("Err: ", err);
      }
    }

    fetchData();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allExpenses}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("EditExpense", {
                  data: item,
                });
              }}
              style={({ pressed }) => pressed && styles.pressed}
            >
              <View style={styles.listItem}>
                <View style={styles.infoContainer}>
                  <Text>{item.title}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text>{item.amount}$</Text>
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
      />
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
    marginBottom: 8,
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
  pressed: {
    backgroundColor: "#fff",
  },
});
