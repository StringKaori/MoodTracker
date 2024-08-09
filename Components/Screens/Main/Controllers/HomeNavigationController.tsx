import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useIsFocused } from '@react-navigation/native';

import RecentMoodDetailView from '../../../Helpers/RecentMoodDetailView';
import HomePage from '../HomePage';
import Dashboard from '../Dashboard';
import TabBarIcon from '../../../Helpers/TabBarIcon';
import MoodListScreen from '../MoodListScreen';
import { MainStackParamList } from '../../../Helpers/Interfaces/RootStackParamList';
import MoodifyScreen from '../MoodifyScreen';

const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator();

const homeRoute: string = "Home";
const dashRoute: string = "Dashboard";
const settingsRoute: string = "Mood List";

function HomeNavigationController() {
  return (
    <Stack.Navigator initialRouteName="HomeTabNavigator">
      <Stack.Screen 
       name="HomeTabNavigator" 
       component={HomeTabNavigationController}
       options={{ headerShown: false}}/>
      <Stack.Screen 
       name="RecentMoodDetailView" 
       component={RecentMoodDetailView} 
       options={{ title: `Recent Mood Details` }}/>
      <Stack.Screen 
       name="MoodifyScreen" 
       component={MoodifyScreen} 
       options={{ title: `Moodify Your Day!` }}/>
    </Stack.Navigator>
  );
}

function HomeTabNavigationController() {
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
            name = homeRoute;
          } else if (route.name === 'Dashboard') {
            iconName = 'line-chart';
            name = dashRoute;
          } else if (route.name === 'Mood List') {
            iconName = 'meh-o';
            name = settingsRoute;
          }

          return <TabBarIcon
            name={name}
            iconName={iconName}
            size={size}
            color={color}
            shouldExpand={useIsFocused()}
          />;
        },
      })}
    >
      <Tab.Screen name={homeRoute} component={HomePage} />
      <Tab.Screen name={dashRoute} component={Dashboard} />
      <Tab.Screen name={settingsRoute} component={MoodListScreen} />
    </Tab.Navigator>
  );
}

export default HomeNavigationController;
