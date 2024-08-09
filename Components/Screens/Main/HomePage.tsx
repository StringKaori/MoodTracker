import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, Image, DimensionValue, ScrollView, TouchableOpacity } from 'react-native';
import MoodifyButton from '../../Helpers/MoodifyButton';
import DefaultMoodType from '../../Helpers/Interfaces/DefaultMoodType';
import MoodCardBuilder from '../../Helpers/MoodCardBuilder';
import { HomePageNavigationProp } from '../../Helpers/Interfaces/RootStackParamList';
import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';

const profileBackgroundPath = "../../../assets/Images/ProfileBackground.png";
const profilePicturePath = "../../../assets/Images/ProfilePic.png";

const dataMock = {
  "username" : "Schadenfreude",
  "streakKind" : "Evil Streak",
  "profileImage": "1354151514r5dfwa43rasd",
  "backgroundImage": "1354151514r5dfwa43rasd",
  "recentMoods" : [
    { 
      "id": 0,
      "dateString" : "Wed., Sep 18th",
      "note": "fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis "
    },
    { 
      "id": 9,
      "dateString" : "Mon., Jul 19th"
    },
    { 
      "id": 18,
      "dateString" : "Mon., Jul 20th"
    },
    { 
      "id": 27,
      "dateString" : "Mon., Jul. 21th",
      "note": "fiquei muito feliz pq eu comi méqui donaudis"
    },
    { 
      "id": 0,
      "dateString" : "Wed., Sep 18th",
      "note": "fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis "
    },
    { 
      "id": 9,
      "dateString" : "Mon., Jul 19th"
    },
    { 
      "id": 18,
      "dateString" : "Mon., Jul 20th"
    },
    { 
      "id": 27,
      "dateString" : "Mon., Jul. 21th",
      "note": "fiquei muito feliz pq eu comi méqui donaudis"
    },
  ]
}

global.recentMoods= dataMock["recentMoods"]

type HomeProps = {
  navigation: HomePageNavigationProp;
};

export default function HomePage({ navigation }: HomeProps) {

  const handleRecentMoodPress = (data: DefaultMoodType) => {
    navigation.navigate('RecentMoodDetailView', { moodData: data });
  }

  const handleMoodifyPress = () => {
    navigation.navigate('MoodifyScreen');
  }

  return (
    <ImageBackground 
     source={require("../../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>

    <ScrollView 
     showsVerticalScrollIndicator={false}
     style={styles.scrollview}>
      <View style = {styles.absoluteContainer}>
        <StatusBar style="auto" />
        <Image 
         source={require(profileBackgroundPath)}
         resizeMode="cover"/>

        <Image 
         source={require(profilePicturePath)}
         style={styles.profilePicture}/>
      </View>

      <View style={styles.reset}/>

      <View style={styles.container}>
        <Text style={styles.userName}>
          {dataMock["username"]}
        </Text>
        <Text style={styles.streakKind}>
          {dataMock["streakKind"]}
        </Text>
          <MoodifyButton handlePress={handleMoodifyPress}/>

          <View style = {styles.recentMoodsContainer}>
            {
                dataMock["recentMoods"].map(mood => (
                  <MoodCardBuilder 
                   mood={mood}
                   buttonSize={130}
                   iconBorderStyle={{borderWidth: 3}}
                   iconBackgroundColor = {"#EEEEEE"}
                   key = { generateRandomString({ length: 16 }) }
                   handlePress = {handleRecentMoodPress}/>
                ))
            }
          </View>
          
      </View>
      
    </ScrollView>

    </ImageBackground>
  );
}

const profilePicProportion: DimensionValue = 150

const styles = StyleSheet.create({
  scrollview: {
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },

  absoluteContainer: {
    position: `relative`
  },

  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  profilePicture: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -(profilePicProportion/2) }, { translateY: -25 }],
    width: profilePicProportion, // Adjust width and height as needed
    height: profilePicProportion,
  },

  reset: {
    height: 40
  },

  userName: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  streakKind: {
    fontSize: 18,
    fontWeight: '600'
  },

  recentMoodsContainer: {
    marginTop: 8,
    justifyContent: `space-evenly`,
    flexDirection: `row`,
    flexWrap: `wrap`
  },
});
