import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from './Interfaces/RootStackParamList';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';

import MoodIconBuilder from './MoodIconBuilder';
import { MoodTypes, MoodTypesString } from './Enums/MoodTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type RecentMoodDetailViewRouteProp = RouteProp<MainStackParamList, 'RecentMoodDetailView'>;
type RecentMoodDetailViewNavigationProp = StackNavigationProp<MainStackParamList, 'RecentMoodDetailView'>;

interface RecentMoodProps {
  route: RecentMoodDetailViewRouteProp;
  navigation: RecentMoodDetailViewNavigationProp;
}

export default function RecentMoodDetailView({ route }: RecentMoodProps) {
  const { moodData } = route.params;
  const minNoteSize = 15
  const maxNoteSize = 25
  const [fontSizeValue, setFontSizeValue] = useState<number>(minNoteSize)

  const handleZoomIn = () => {
    if(fontSizeValue < maxNoteSize) {
      let size = fontSizeValue
      setFontSizeValue(size + 1)
    }
  }

  const handleZoomOut = () => {
    if(fontSizeValue > minNoteSize) {
      let size = fontSizeValue
      setFontSizeValue(size - 1)
    }
  }

  return (
    <ImageBackground 
     source={require("../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>
      <View style = {styles.container}>
          <Text style={[styles.textContainer, styles.date]}> 
            { moodData.dateString }
          </Text>
          <MoodIconBuilder 
           moodName={MoodTypes[moodData["id"]] as MoodTypesString} 
           buttonSize={130}
           backgroundColor = {"white"}
          />
          <ScrollView>
            <View style = {styles.container}>
              <Text> Notes: </Text>
              <View style={styles.zoomContainer}>
                <TouchableOpacity onPress={handleZoomOut}>
                  <FontAwesome 
                    name = { "minus" } 
                    size = { 30 } />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleZoomIn}>
                  <FontAwesome 
                    name = { "plus" } 
                    size = { 30 } />
                </TouchableOpacity>
              </View>
              <Text style = {[styles.textContainer, styles.notes, {fontSize: fontSizeValue}]}>
                { moodData.note ?? "What a pity, you didn't take any notes this day :/" } 
              </Text>
            </View>
          </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: `flex-start`
  }, 
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textContainer: {
    textAlign: `center`,
    backgroundColor: `white`,
    borderColor: `black`,
    borderWidth: 2,
  },
  date: {
    width: 150,
    fontSize: 15,
    borderRadius: 15
  },
  notes: {
    borderRadius: 10,
    padding: 5
  },
  zoomContainer: {
    width: 100,
    flexDirection: `row`,
    justifyContent: `space-evenly`,
  }
});