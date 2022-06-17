import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

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
    backgroundColor: GlobalStyles.colors.metallicGrey,
    alignItems: "center",
    justifyContent: "center",
  },
});
