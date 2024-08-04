// navigation.d.ts
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  HomeNavigator: undefined;
  // Add other screens here
};

export type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
