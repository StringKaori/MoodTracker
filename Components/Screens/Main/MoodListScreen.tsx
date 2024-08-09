import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, ScrollView } from 'react-native';
import MoodCardBuilder from '../../Helpers/MoodCardBuilder';
import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';
import { convertToDateString } from '../../Helpers/ConvenienceFunctions/ConvertToDateString';
import DefaultMoodType, { NavigationMoodType } from '../../Helpers/Interfaces/DefaultMoodType';
import { HomePageNavigationProp } from '../../Helpers/Interfaces/RootStackParamList';

const data = [
  { id: 0, date: new Date(2024, 8, 18, 14, 30, 0), note: "Muito frustrado com a situação atual." },
  { id: 1, date: new Date(2024, 8, 18, 15, 0, 0), note: "Fiquei irritado com a falta de comunicação." },
  { id: 2, date: new Date(2024, 8, 18, 16, 0, 0), note: "" },
  { id: 3, date: new Date(2024, 8, 18, 17, 0, 0), note: "Sentindo ansiedade por causa do prazo." },
  { id: 4, date: new Date(2024, 8, 18, 18, 0, 0), note: "" },
  { id: 5, date: new Date(2024, 8, 18, 19, 0, 0), note: "Nervoso para a apresentação de amanhã." },
  { id: 6, date: new Date(2024, 8, 18, 20, 0, 0), note: "Desgostoso com a situação do trabalho." },
  { id: 7, date: new Date(2024, 8, 18, 21, 0, 0), note: "" },
  { id: 8, date: new Date(2024, 8, 18, 22, 0, 0), note: "Incomodado com o barulho." },

  { id: 9, date: new Date(2024, 8, 19, 23, 0, 0), note: "Surpreendido com a notícia positiva." },
  { id: 10, date: new Date(2024, 8, 19, 0, 0, 0), note: "Sentindo-se animado com o novo projeto." },
  { id: 11, date: new Date(2024, 8, 19, 1, 0, 0), note: "" },
  { id: 12, date: new Date(2024, 8, 19, 2, 0, 0), note: "Cheio de energia para trabalhar." },
  { id: 13, date: new Date(2024, 8, 19, 3, 0, 0), note: "" },
  { id: 14, date: new Date(2024, 8, 19, 4, 0, 0), note: "Orgulhoso das conquistas recentes." },
  { id: 15, date: new Date(2024, 8, 19, 5, 0, 0), note: "" },
  { id: 16, date: new Date(2024, 8, 19, 6, 0, 0), note: "Esperançoso quanto ao futuro." },
  { id: 17, date: new Date(2024, 8, 19, 7, 0, 0), note: "Brincalhão e leve." },

  { id: 18, date: new Date(2024, 8, 19, 8, 0, 0), note: "Desgostoso com a comida." },
  { id: 19, date: new Date(2024, 8, 19, 9, 0, 0), note: "" },
  { id: 20, date: new Date(2024, 8, 19, 10, 0, 0), note: "Sentindo-se envergonhado em público." },
  { id: 21, date: new Date(2024, 8, 19, 11, 0, 0), note: "" },
  { id: 22, date: new Date(2024, 8, 19, 12, 0, 0), note: "Mal-humorado pela manhã." },
  { id: 23, date: new Date(2024, 8, 19, 13, 0, 0), note: "Entediado sem atividades." },
  { id: 24, date: new Date(2024, 8, 19, 14, 0, 0), note: "" },
  { id: 25, date: new Date(2024, 8, 19, 15, 0, 0), note: "Sentindo-se sem esperanças." },
  { id: 26, date: new Date(2024, 8, 19, 16, 0, 0), note: "Cansado e exausto." },

  { id: 27, date: new Date(2024, 8, 19, 17, 0, 0), note: "Sentindo-se seguro e confortável." },
  { id: 28, date: new Date(2024, 8, 19, 18, 0, 0), note: "" },
  { id: 29, date: new Date(2024, 8, 19, 19, 0, 0), note: "Agradecido pelas pequenas coisas." },
  { id: 30, date: new Date(2024, 8, 19, 20, 0, 0), note: "" },
  { id: 31, date: new Date(2024, 8, 19, 21, 0, 0), note: "Sentindo-se descansado." },
  { id: 32, date: new Date(2024, 8, 19, 22, 0, 0), note: "" },
  { id: 33, date: new Date(2024, 8, 19, 23, 0, 0), note: "Com sono." },
  { id: 34, date: new Date(2024, 8, 20, 0, 0, 0), note: "" },
  { id: 35, date: new Date(2024, 8, 20, 1, 0, 0), note: "Sentindo-se relaxado." }
];

type NavigationProps = {
  navigation: HomePageNavigationProp;
};

export default function MoodListScreen({ navigation }: NavigationProps) {

  const handleCardPress = (mood: DefaultMoodType) => {
    let navigationData: NavigationMoodType = {
      id: mood.id,
      dateString: convertToDateString(mood.date!),
      note: mood.note
    }
    navigation.navigate('RecentMoodDetailView', { moodData: navigationData });
  }

  return (
    <ImageBackground 
     source={require("../../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>
    <StatusBar style="auto" />
    <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Moods List</Text>
        </View>

        <ScrollView>
          <View style = {styles.moodsContainer}>
            { 
              data.map(mood => (
                <MoodCardBuilder 
                 mood={mood}
                 buttonSize={130}
                 iconBorderStyle={{borderWidth: 3}}
                 middleTextString={convertToDateString(mood.date)}
                 iconBackgroundColor = {"#EEEEEE"}
                 handlePress={handleCardPress}
                 key = { generateRandomString({ length: 16 }) }/>
              ))
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
