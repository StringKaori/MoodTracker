import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import HomeTabNavigationController from '../../Main/Controllers/HomeTabNavigationController';

const Stack = createStackNavigator();

export default function AuthNavigationController() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerShown: true }} />
        <Stack.Screen 
          name="HomeNavigator" 
          component={HomeTabNavigationController} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
