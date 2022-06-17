import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AddExpense from "./screens/AddExpense";
import TabNavigator from "./screens/TabNavigator";
import ExpensesContextProvider from "./store/context";
import { GlobalStyles } from "./constants/styles";
import EditExpense from "./screens/EditExpense";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.blueviolet,
                },
                headerTintColor: "#fff",
              }}
              name="AddExpense"
              component={AddExpense}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.blueviolet,
                },
                headerTintColor: "#fff",
              }}
              name="EditExpense"
              component={EditExpense}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
