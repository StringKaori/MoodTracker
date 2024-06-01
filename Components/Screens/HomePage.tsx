import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, Image, DimensionValue, Button } from 'react-native';
import MoodifyButton from '../Helpers/MoodifyButton';

const profileBackgroundPath = "../../assets/Images/ProfileBackground.png";
const profilePicturePath = "../../assets/Images/ProfilePic.png";

const dataMock = {
  "username" : "Schadenfreude",
  "streakKind" : "Evil Streak"
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
});
