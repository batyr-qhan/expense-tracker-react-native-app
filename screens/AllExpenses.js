import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context";

function AllExpenses({ navigation }) {
  const { allExpenses } = useContext(ExpensesContext);

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
