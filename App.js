import {Text, View, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AllExpenses from './src/screens/AllExpenses';
import ManageExpense from './src/screens/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses';
import Icon from 'react-native-vector-icons/AntDesign';
import {GlobalStyles} from './src/constants/customStyles';
import IconButton from './src/components/UI/IconButton';
import ExpensesContextProvider from './src/store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  const navigation = useNavigation();

  const addIconPressHandler = () => {
    navigation.navigate('ManageExpense');
  };

  return (
    <React.Fragment>
      <BottomTabs.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
          tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({tintColor}) => {
            return (
              <IconButton
                onPress={addIconPressHandler}
                color={tintColor}
                size={24}
                name="pluscircleo"
              />
            );
          }
        }}>
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({color, size}) => (
              <Icon name="hourglass" size={size} color={color} />
            )
          }}
        />
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'Expenses',
            tabBarIcon: ({color, size}) => (
              <Icon name="calendar" color={color} size={size} />
            )
          }}
        />
      </BottomTabs.Navigator>
    </React.Fragment>
  );
};

const App = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white'
            }}>
            <Stack.Screen
              name="ExpenseOverview"
              component={ExpensesOverview}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </React.Fragment>
  );
};

export default App;
