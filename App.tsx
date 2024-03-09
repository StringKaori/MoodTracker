import * as React from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from './Components/Screens/HomePage';
import Dashboard from './Components/Screens/Dashboard';
import TabBarIcon from './Components/Helpers/TabBarIcon';

const Tab = createBottomTabNavigator();
const homeRoute: string = "Home";
const dashRoute: string = "Dashboard";
const slaRoute: string = "Sla";

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = "";
            let name: string = "";

            if (route.name === 'Home') {
              iconName = 'home';
              name = homeRoute
            } else if (route.name === 'Dashboard') {
              iconName = 'line-chart';
              name = dashRoute
            } else if (route.name === 'Sla') {
              iconName = 'sticky-note';
              name = slaRoute
            }

            return <TabBarIcon 
                    name={name}
                    iconName={iconName}
                    size={size}
                    color={color} 
                    shouldExpand={useIsFocused()}/>;
          },
        })}
      >
        <Tab.Screen name={homeRoute} component={HomePage} />
        <Tab.Screen name={dashRoute} component={Dashboard} />
        <Tab.Screen name={slaRoute} component={Dashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;