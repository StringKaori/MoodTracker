// Tela para visualização e edição de detalhes de um humor recente
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from './Interfaces/RootStackParamList';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, TextInput } from 'react-native';

import MoodIconBuilder from './MoodIconBuilder';
import { MoodTypes, MoodTypesString } from './Enums/MoodTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CharacterLimitReached, NoNotesTaken } from './Errors/ErrorTexts';
import { Dimensions } from 'react-native';
import { UpdateMoodEntryType } from './Interfaces/RequestTypes';
import { updateMoodEntry } from './RequestBase';

const screenWidth = Dimensions.get('window').width;

type RecentMoodDetailViewRouteProp = RouteProp<MainStackParamList, 'RecentMoodDetailView'>;
type RecentMoodDetailViewNavigationProp = StackNavigationProp<MainStackParamList, 'RecentMoodDetailView'>;

interface RecentMoodProps {
  route: RecentMoodDetailViewRouteProp;
  navigation: RecentMoodDetailViewNavigationProp;
}

// Componente para visualizar e editar detalhes de um humor recente
export default function RecentMoodDetailView({ route, navigation }: RecentMoodProps) {
  const noteCharacterLimit: number = 360;

  const { moodData } = route.params;
  const minNoteSize = 15;
  const maxNoteSize = 25;
  const [fontSizeValue, setFontSizeValue] = useState<number>(minNoteSize);
  const [alteredNotes, setAlteredNotes] = useState(moodData.note ?? "");
  const [shouldShowSaveChangesButton, setShouldShowSaveChangesButton] = useState(false);
  const [shouldShowCharacterLimitError, setShouldShowCharacterLimitError] = useState(false);

  // Aumenta o tamanho da fonte
  const handleZoomIn = () => {
    if (fontSizeValue < maxNoteSize) {
      let size = fontSizeValue;
      setFontSizeValue(size + 1);
    }
  };

  // Diminui o tamanho da fonte
  const handleZoomOut = () => {
    if (fontSizeValue > minNoteSize) {
      let size = fontSizeValue;
      setFontSizeValue(size - 1);
    }
  };

  // Manipula a alteração do texto da nota
  const handleNoteChange = (text: string) => {
  const isTextInvalid = text.length > noteCharacterLimit;
    setShouldShowCharacterLimitError(isTextInvalid);
    if (isTextInvalid) { return; }

    setAlteredNotes(text);
    handleSaveChangesVisibility(text);
  };

  // Controla a visibilidade do botão de salvar alterações
  const handleSaveChangesVisibility = (text: string) => {
    const saveChangesVisibility = text !== moodData.note;
    setShouldShowSaveChangesButton(saveChangesVisibility);
  };

  // Salva as alterações feitas na nota
  const didPressToSaveChanges = () => {
    const body: UpdateMoodEntryType = {
      mood_id: moodData.mood_id!,
      text_content: alteredNotes
    };

    updateMoodEntry(body)
      .then((data) => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error(error.message);
        // throw error;
      });
  };

  return (
    <ImageBackground
      source={require("../../assets/Images/AppBackground.png")}
      resizeMode="cover"
      style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.textContainer, styles.date]}>
          {moodData.dateString}
        </Text>
        <MoodIconBuilder
          moodName={MoodTypes[moodData["id"]] as MoodTypesString}
          buttonSize={130}
          backgroundColor={"white"}
        />
        <ScrollView>
          <View style={styles.container}>
            <Text>Notes:</Text>
            <View style={styles.zoomContainer}>
              <TouchableOpacity onPress={handleZoomOut}>
                <FontAwesome
                  name={"minus"}
                  size={30} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleZoomIn}>
                <FontAwesome
                  name={"plus"}
                  size={30} />
              </TouchableOpacity>
            </View>

            <TextInput
              multiline={true}
              numberOfLines={10}
              value={alteredNotes}
              style={[styles.textContainer, styles.notes, { fontSize: fontSizeValue }]}
              onChangeText={handleNoteChange} />
            {(!moodData.note && !shouldShowSaveChangesButton) && <NoNotesTaken />}
            {shouldShowCharacterLimitError && <CharacterLimitReached limit={noteCharacterLimit} />}

            {shouldShowSaveChangesButton &&
              <TouchableOpacity
                style={styles.saveChangesButton}
                onPress={didPressToSaveChanges}>
                <Text style={styles.saveChangesText}>Save Changes</Text>
              </TouchableOpacity>
            }
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

// Estilos para o componente RecentMoodDetailView e seus subcomponentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textContainer: {
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  date: {
    width: 150,
    fontSize: 15,
    borderRadius: 15
  },
  notes: {
    textAlign: 'justify',
    textAlignVertical: 'top',
    padding: 5,
    borderRadius: 10,
    width: screenWidth,
    maxWidth: '95%',
  },
  zoomContainer: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  saveChangesButton: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3eafb',
    height: 50,
    width: 200,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 3
  },
  saveChangesText: {
    flex: 1,
    fontSize: 26,
    textAlign: 'center'
  }
});
