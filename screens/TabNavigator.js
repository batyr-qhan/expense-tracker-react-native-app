import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import AllExpenses from "./AllExpenses";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/styles";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          } else if (route.name === "All") {
            iconName = focused ? "list-outline" : "list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: GlobalStyles.colors.blueviolet,
        },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.blueviolet,
          height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen
        name="All"
        component={AllExpenses}
        options={{
          headerRight: () => {
            let navigation = useNavigation();
            return (
              <Ionicons
                name="add-outline"
                size={24}
                color="#fff"
                onPress={() => {
                  navigation.navigate("AddExpense");
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown:
          headerRight: () => {
            let navigation = useNavigation();
            return (
              <Ionicons
                name="add-outline"
                size={24}
                color="#fff"
                onPress={() => {
                  navigation.navigate("AddExpense");
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
