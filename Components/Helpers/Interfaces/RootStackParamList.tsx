import { StackNavigationProp } from "@react-navigation/stack";
import RecentMoodType from "./RecentMoodType";

export type MainStackParamList = {
    HomeTabNavigator: undefined;
    RecentMoodDetailView: { moodData: RecentMoodType };
};

export type HomePageNavigationProp = StackNavigationProp<MainStackParamList, 'HomeTabNavigator'>;