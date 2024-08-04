import { useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '../HomePage';
import Dashboard from '../Dashboard';
import TabBarIcon from '../../../Helpers/TabBarIcon';

const Tab = createBottomTabNavigator();
const homeRoute: string = "Home";
const dashRoute: string = "Dashboard";
const settingsRoute: string = "Settings";

function HomeNavigationController() {
  return (
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
          } else if (route.name === 'Settings') {
            iconName = 'gear';
            name = settingsRoute
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
      <Tab.Screen name={settingsRoute} component={Dashboard} />
    </Tab.Navigator>
  );
}

export default HomeNavigationController;