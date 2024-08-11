// Navegação principal do aplicativo com abas e navegação em pilha
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
import EditAccountDetailsScreen from '../../../Helpers/EditAccountDetailsScreen';

const Stack = createStackNavigator<MainStackParamList>();
const Tab = createBottomTabNavigator();

// Nomes das rotas para a navegação
const homeRoute: string = "Home";
const dashRoute: string = "Dashboard";
const settingsRoute: string = "Mood List";

// Controlador de navegação para a pilha principal
function HomeNavigationController() {
  return (
    <Stack.Navigator initialRouteName="HomeTabNavigator">
      <Stack.Screen 
        name="HomeTabNavigator" 
        component={HomeTabNavigationController}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="RecentMoodDetailView" 
        component={RecentMoodDetailView} 
        options={{ title: `Recent Mood Details` }} />
      <Stack.Screen 
        name="MoodifyScreen" 
        component={MoodifyScreen} 
        options={{ title: `Moodify Your Day!` }} />
      <Stack.Screen 
        name="EditAccountDetails" 
        component={EditAccountDetailsScreen} 
        options={{ title: `Edit account details` }} />
    </Stack.Navigator>
  );
}

// Controlador de navegação para as abas na tela inicial
function HomeTabNavigationController() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => null,
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "";
          let name: string = "";

          // Define o ícone e o nome da rota com base na rota atual
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
