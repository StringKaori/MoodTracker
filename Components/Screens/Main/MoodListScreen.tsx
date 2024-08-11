// Tela de listagem de humores passados
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import MoodCardBuilder from '../../Helpers/MoodCardBuilder';
import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';
import { convertToDateString } from '../../Helpers/ConvenienceFunctions/ConvertToDateString';
import DefaultMoodType, { NavigationMoodType } from '../../Helpers/Interfaces/DefaultMoodType';
import { HomePageNavigationProp } from '../../Helpers/Interfaces/RootStackParamList';
import { useEffect, useState, useCallback } from 'react';
import { deleteMoodEntry, getAllMoods } from '../../Helpers/RequestBase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DeleteMoodEntry } from '../../Helpers/Interfaces/RequestTypes';
import { useFocusEffect } from '@react-navigation/native';

type NavigationProps = {
  navigation: HomePageNavigationProp;
};

export default function MoodListScreen({ navigation }: NavigationProps) {

  const [allMoods, setAllMoods] = useState<DefaultMoodType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Função para buscar todos os humores
  const fetchAllMoods = async () => {
    try {
      const result = await getAllMoods();
      setAllMoods(result);
    } catch (error) {
      console.error('Error fetching all moods:', error);
    }
  };

  // Atualiza a lista de humores quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchAllMoods();
    }, [])
  );

  // Função para tratar o clique em um card de humor
  const handleCardPress = (mood: DefaultMoodType) => {
    let navigationData: NavigationMoodType = {
      mood_id: mood.mood_id,
      id: mood.id,
      dateString: convertToDateString(mood.date!),
      note: mood.note
    }
    navigation.navigate('RecentMoodDetailView', { moodData: navigationData });
  };

  // Função para atualizar a lista de humores ao puxar para baixo
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllMoods();
    setRefreshing(false);
  };

  // Função para deletar um humor
  const handleDeleteMood = async (mood: DefaultMoodType) => {
    const body: DeleteMoodEntry = {
      mood_id: mood.mood_id!
    }
    try {
      await deleteMoodEntry(body);
      await fetchAllMoods(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error('Error deleting mood entry:', error);
    }
  }

  return (
    <ImageBackground 
     source={require("../../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>
    <StatusBar style="auto" />
    <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Past Moods List</Text>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.moodsContainer}>
            { allMoods.length > 0 ? (
                allMoods.map(mood => (
                  <View key={generateRandomString({ length: 16 })}>
                    <TouchableOpacity 
                     onPress={() => handleDeleteMood(mood)}>
                      <FontAwesome 
                        name={"trash"}
                        size={20} /> 
                    </TouchableOpacity>
                    <MoodCardBuilder 
                     mood={mood}
                     buttonSize={130}
                     iconBorderStyle={{borderWidth: 3}}
                     middleTextString={convertToDateString(mood.date!)}
                     iconBackgroundColor={"#EEEEEE"}
                     handlePress={handleCardPress}
                     key={generateRandomString({ length: 16 })} />
                  </View>
                ))
              ) : (
                <Text style={{color: `red`}}>You haven't made an entry yet :/ </Text>
              )
            }
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
    justifyContent: 'center'
  },
  header: {
    marginTop: 50
  },
  headerText: {
    fontSize: 20
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#EEEEEE'
  },
  moodsContainer: {
    marginTop: 8,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
