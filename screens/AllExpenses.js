import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";
import ErrorOverlay from "../UI/ErrorOverlay";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getExpenses } from "../utils/http";

function AllExpenses({ navigation }) {
  const { allExpenses, setAllExpenses } = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  // console.log("all expenses rendered");

  useEffect(() => {
    console.log("context useeffect render");
    async function fetchData() {
      try {
        setIsFetching(true);
        const response = await getExpenses();
        console.log(response);
        setIsFetching(false);
        setAllExpenses(response.reverse());
      } catch (err) {
        setIsFetching(false);
        console.log("Err: ", err);
        setError("could not fetch data");
      }
    }

    fetchData();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
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
                  <Text style={styles.text}>{item.title}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.text}>{item.amount}$</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.text}>
                    {item.expenseDate ? item.expenseDate : null}
                  </Text>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoContainer: {
    padding: 4,
    borderRadius: 6,
    width: "50%",
  },
  pressed: {
    backgroundColor: "#fff",
  },
  text: {
    backgroundColor: "#fff",
    marginHorizontal: 4,
    marginVertical: 2,
    padding: 8,
    borderRadius: 6,
  },
});
