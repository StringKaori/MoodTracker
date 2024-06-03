import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, Image, DimensionValue } from 'react-native';
import { MoodTypes, MoodTypesString } from '../Helpers/Enums/MoodTypes';
import MoodifyButton from '../Helpers/MoodifyButton';
import MoodIconBuilder from '../Helpers/MoodIconBuilder';

const profileBackgroundPath = "../../assets/Images/ProfileBackground.png";
const profilePicturePath = "../../assets/Images/ProfilePic.png";

const dataMock = {
  "username" : "Schadenfreude",
  "streakKind" : "Evil Streak",
  "recentMoods" : [
    { 
      "id": 1,
      "dateString" : "Monday, July 18th"
    },
    { 
      "id": 7,
      "dateString" : "Monday, July 19th"
    },
    { 
      "id": 9,
      "dateString" : "Monday, July 20th"
    },
    { 
      "id": 8,
      "dateString" : "Monday, July 21th"
    }
  ]
}

export default function HomePage() {
  return (
    <ImageBackground 
     source={require("../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>

      <View>
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

        <MoodifyButton/>

        <View style = {styles.recentMoodsContainer}>
          {
            dataMock["recentMoods"].map(data => (
              <View style = { styles.recentMoodsItem }>
                <MoodIconBuilder 
                moodName={MoodTypes[data["id"]] as MoodTypesString} 
                buttonSize={130}/>

                <Text style={styles.recentMoodsItemText}>{data["dateString"]}</Text>

                <Text style = {styles.labelPlaceHolder}>{MoodTypes[data["id"]]}</Text>
              </View>
            ))
          }
        </View>
      </View>

    </ImageBackground>
  );
}

const profilePicProportion: DimensionValue = 150

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'flex-start'
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
    alignContent: `center`,
    justifyContent: `space-evenly`,
    flexDirection: `row`,
    flexWrap: `wrap`
  },

  recentMoodsItem: {
  },

  recentMoodsItemText: {
    textAlign: `center`
  },

  labelPlaceHolder: {
    textAlign: `center`,
    backgroundColor: `red`,
    borderRadius: 50
  }
});
