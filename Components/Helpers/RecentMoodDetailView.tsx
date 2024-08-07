import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './Interfaces/RootStackParamList';
import { View, Text } from 'react-native';

type RecentMoodDetailViewRouteProp = RouteProp<RootStackParamList, 'RecentMoodDetailView'>;
type RecentMoodDetailViewNavigationProp = StackNavigationProp<RootStackParamList, 'RecentMoodDetailView'>;

interface Props {
  route: RecentMoodDetailViewRouteProp;
  navigation: RecentMoodDetailViewNavigationProp;
}

// Define and export the function component
export default function RecentMoodDetailView({ route }: Props) {
  const { moodData } = route.params;

  return (
    <View>
        <Text> id: {moodData.id} </Text>
        <Text> data: {moodData.dateString} </Text>
        <Text> note: {moodData.note} </Text>
    </View>
  );
}
