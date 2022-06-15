import { StyleSheet, Text, View } from "react-native";

function RecentExpenses() {
  return (
    <View style={styles.container}>
      <Text>This is profile page</Text>
    </View>
  );
}

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
