import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import AllExpenses from "./AllExpenses";
import RecentExpenses from "./RecentExpenses";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Recent"
        component={RecentExpenses}
        options={{
          // headerShown:
          headerRight: () => {
            let navigation = useNavigation();
            return (
              <Ionicons
                name="add-outline"
                size={24}
                onPress={() => {
                  navigation.navigate("AddExpense");
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen name="All" component={AllExpenses} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
