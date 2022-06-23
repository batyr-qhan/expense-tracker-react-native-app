import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AddExpense from "./screens/AddExpense";
import TabNavigator from "./screens/TabNavigator";
import ExpensesContextProvider from "./store/context";
import { GlobalStyles } from "./constants/styles";
import EditExpense from "./screens/EditExpense";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import LoadingOverlay from "./UI/LoadingOverlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // headerStyle: { backgroundColor: Colors.primary500 },
          // headerTintColor: "white",
          // contentStyle: { backgroundColor: Colors.primary100 },
        }
      }
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <ExpensesContextProvider>
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
    </ExpensesContextProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        // setAuthToken(token);
        authCtx.authenticate(storedToken);
      }

      setIsLoading(false);
    }

    fetchToken();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
