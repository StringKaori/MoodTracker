import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, Image, DimensionValue, ScrollView, TouchableOpacity } from 'react-native';
import MoodifyButton from '../../Helpers/MoodifyButton';
import DefaultMoodType, { NavigationMoodType } from '../../Helpers/Interfaces/DefaultMoodType';
import MoodCardBuilder from '../../Helpers/MoodCardBuilder';
import { HomePageNavigationProp } from '../../Helpers/Interfaces/RootStackParamList';
import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';
import { convertToDateString } from '../../Helpers/ConvenienceFunctions/ConvertToDateString';

const profileBackgroundPath = "../../../assets/Images/ProfileBackground.png";
const profilePicturePath = "../../../assets/Images/ProfilePic.png";

const dataMock = {
  "username" : "Schadenfreude",
  "streakKind" : "Evil Streak",
  "profileImage": "1354151514r5dfwa43rasd",
  "backgroundImage": "1354151514r5dfwa43rasd",
  "recentMoods" : [
    { 
      id: 0,
      date: new Date(2024, 8, 18, 14, 30, 0),
      note: "fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis "
    },
    { 
      id: 9,
      date: new Date(2024, 6, 19, 9, 0, 0),
    },
    { 
      id: 18,
      date: new Date(2024, 6, 20, 18, 45, 0),
    },
    { 
      id: 27,
      date: new Date(2024, 6, 21, 23, 15, 0),
      note: "fiquei muito feliz pq eu comi méqui donaudis"
    },
    { 
      id: 0,
      date: new Date(2024, 8, 18, 12, 0, 0),
      note: "fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis, fiquei muito puto pq eu n comi méqui donaudis,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis ,fiquei muito puto pq eu n comi méqui donaudis "
    },
    { 
      id: 9,
      date: new Date(2024, 6, 19, 8, 30, 0),
    },
    { 
      id: 18,
      date: new Date(2024, 6, 20, 15, 30, 0),
    },
    { 
      id: 27,
      date: new Date(2024, 6, 21, 20, 0, 0),
      note: "fiquei muito feliz pq eu comi méqui donaudis"
    }
  ]
}

global.recentMoods= dataMock["recentMoods"]

type HomeProps = {
  navigation: HomePageNavigationProp;
};

export default function HomePage({ navigation }: HomeProps) {

  const handleRecentMoodPress = (data: DefaultMoodType) => {
    // se não for assim o ts reclama que é passado um valor não serializado via navigation
    let navigationData: NavigationMoodType = {
      id: data.id,
      dateString: convertToDateString(data.date!),
      note: data.note
    }
    navigation.navigate('RecentMoodDetailView', { moodData: navigationData });
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
                   iconBorderStyle={{borderWidth: 2, borderRadius: 20,
                    borderBottomWidth: 7,
                    borderRightWidth: 7}}
                   middleTextString={convertToDateString(mood.date)}
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

  filterIcon: {
  }
});
