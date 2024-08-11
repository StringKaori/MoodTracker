import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import MoodCardBuilder from '../../Helpers/MoodCardBuilder';
import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';
import { convertToDateString } from '../../Helpers/ConvenienceFunctions/ConvertToDateString';
import DefaultMoodType, { NavigationMoodType } from '../../Helpers/Interfaces/DefaultMoodType';
import { HomePageNavigationProp } from '../../Helpers/Interfaces/RootStackParamList';
import { useEffect, useState } from 'react';
import { deleteMoodEntry, getAllMoods } from '../../Helpers/RequestBase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DeleteMoodEntry } from '../../Helpers/Interfaces/RequestTypes';

type NavigationProps = {
  navigation: HomePageNavigationProp;
};

export default function MoodListScreen({ navigation }: NavigationProps) {

  const [allMoods, setAllMoods] = useState<DefaultMoodType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAllMoods = async () => {
    try {
      const result = await getAllMoods();
      setAllMoods(result);
    } catch (error) {
      // Show error modal
    }
  };

  useEffect(() => {
    fetchAllMoods();
  }, []);

  const handleCardPress = (mood: DefaultMoodType) => {
    let navigationData: NavigationMoodType = {
      mood_id: mood.mood_id,
      id: mood.id,
      dateString: convertToDateString(mood.date!),
      note: mood.note
    }
    navigation.navigate('RecentMoodDetailView', { moodData: navigationData });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllMoods();
    setRefreshing(false);
  };

  const handleDeleteMood = (mood: DefaultMoodType) => {
    const body: DeleteMoodEntry = {
      mood_id: mood.mood_id!
    }
    deleteMoodEntry(body)
     .then((data) => {  
        onRefresh()
     })

     .catch((error) => {
        console.error(error.message)
        // throw error;
     });
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
            { allMoods && allMoods.length > 0 ? (
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
              ) : (<Text>You haven't made a entry yet :/ </Text>)
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
    width: `100%`,
    backgroundColor: `#EEEEEE`
  },
  moodsContainer: {
    marginTop: 8,
    justifyContent: `space-evenly`,
    flexDirection: `row`,
    flexWrap: `wrap`
  },
});
