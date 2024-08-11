import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationMoodType } from "./DefaultMoodType";

export type MainStackParamList = {
    HomeTabNavigator: undefined;
    RecentMoodDetailView: { moodData: NavigationMoodType };
    EditAccountDetails: undefined;
    MoodifyScreen: undefined;
};

export type HomePageNavigationProp = StackNavigationProp<MainStackParamList, 'HomeTabNavigator'>;