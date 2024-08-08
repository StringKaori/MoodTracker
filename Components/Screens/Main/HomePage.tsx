import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, Image, DimensionValue, ScrollView, TouchableOpacity } from 'react-native';
import { MoodTypes, MoodTypesString, MoodTypesColor } from '../../Helpers/Enums/MoodTypes';
import MoodifyButton from '../../Helpers/MoodifyButton';
import MoodIconBuilder from '../../Helpers/MoodIconBuilder';
import RecentMoodType from '../../Helpers/Interfaces/RecentMoodType';

import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';
import { HomePageNavigationProp } from '../../Helpers/Interfaces/RootStackParamList';

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

  const handleRecentMoodPress = (data: RecentMoodType) => {
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
              dataMock["recentMoods"].map(data => (
                <View 
                  style = { styles.recentMoodsItem }
                  key = { generateRandomString({ length: 16 }) }>
                  <TouchableOpacity 
                   onPress={() => handleRecentMoodPress(data)}>
                    <MoodIconBuilder 
                      moodName={MoodTypes[data["id"]] as MoodTypesString} 
                      iconBorderStyle={{borderWidth: 3}}
                      buttonSize={130}
                      backgroundColor = {"#EEEEEE"}/>

                    <Text style={styles.recentMoodsItemText}>{data["dateString"]}</Text>

                    <Text style = { [styles.recentMoodsLabel, {backgroundColor: MoodTypesColor[MoodTypes[data["id"]] as keyof typeof MoodTypesColor]}] }>
                      {MoodTypes[data["id"]]}
                    </Text>
                  </TouchableOpacity>
                </View>
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

  recentMoodsItem: {
  },

  recentMoodsItemText: {
    textAlign: `center`,
  },

  recentMoodsLabel: {
    marginTop: 6,
    marginBottom: 20,
    textAlign: `center`,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
    fontWeight: `500`
  }
});
