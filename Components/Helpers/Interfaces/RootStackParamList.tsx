import { StackNavigationProp } from "@react-navigation/stack";
import RecentMoodType from "./RecentMoodType";

export type RootStackParamList = {
    HomeTabNavigator: undefined;
    RecentMoodDetailView: { moodData: RecentMoodType };
};

export type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'HomeTabNavigator'>;