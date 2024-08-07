import { StackNavigationProp } from "@react-navigation/stack";
import RecentMoodType from "./DefaultMoodType";

export type MainStackParamList = {
    HomeTabNavigator: undefined;
    RecentMoodDetailView: { moodData: RecentMoodType };
    MoodifyScreen: undefined;
};

export type HomePageNavigationProp = StackNavigationProp<MainStackParamList, 'HomeTabNavigator'>;