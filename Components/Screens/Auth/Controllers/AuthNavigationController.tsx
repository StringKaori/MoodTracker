// Controlador de navegação para telas de autenticação e navegação principal
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';
import HomeNavigationController from '../../Main/Controllers/HomeNavigationController';

const Stack = createStackNavigator();

export default function AuthNavigationController() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" // Tela inicial do Stack Navigator
        screenOptions={{ headerShown: false }}> {/* Oculta cabeçalhos para todas as telas por padrão*/}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ headerShown: true }} /> {/* Mostra o cabeçalho apenas na tela de registro */}
        <Stack.Screen 
          name="HomeNavigator" // Navigator principal do app
          component={HomeNavigationController} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
