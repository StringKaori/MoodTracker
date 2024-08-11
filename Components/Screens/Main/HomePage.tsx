// Tela principal do usuário com informações de perfil e humores recentes

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, Image, DimensionValue, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import MoodifyButton from '../../Helpers/MoodifyButton';
import DefaultMoodType, { NavigationMoodType } from '../../Helpers/Interfaces/DefaultMoodType';
import MoodCardBuilder from '../../Helpers/MoodCardBuilder';
import { HomePageNavigationProp } from '../../Helpers/Interfaces/RootStackParamList';
import { generateRandomString } from '../../Helpers/ConvenienceFunctions/GenerateRandomString';
import { convertToDateString } from '../../Helpers/ConvenienceFunctions/ConvertToDateString';
import generateTestData from '../../Helpers/ConvenienceFunctions/GenerateTestData';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useCallback, useEffect, useState } from 'react';
import { getHomeData, updateProfileImage } from '../../Helpers/RequestBase';
import { UpdateImageType, UserDataType } from '../../Helpers/Interfaces/RequestTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const profileBackgroundPath = "../../../assets/Images/ProfileBackground.png";
const profilePicturePath = "../../../assets/Images/ProfilePic.png";

type HomeProps = {
  navigation: HomePageNavigationProp;
};

// Componente da tela principal do usuário
export default function HomePage({ navigation }: HomeProps) {
  const [dataChanged, setDataChanged] = useState(false); // Estado para rastrear se os dados foram alterados
  const [refreshing, setRefreshing] = useState(false);
  const [imageBytes, setImageBytes] = useState<string | null>(null);

  // Função para buscar os dados
  const fetchHomeData = async () => {
    try {
      const result: UserDataType = await getHomeData();
      global.userData = result;
      setDataChanged(prev => !prev); // Atualiza o estado para forçar uma re-renderização
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHomeData(); // Busca os dados quando o componente ganha foco
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHomeData();
    setRefreshing(false);
  };

  // Manipula o clique no humor recente
  const handleRecentMoodPress = (data: DefaultMoodType) => {
    let navigationData: NavigationMoodType = {
      mood_id: data.mood_id,
      id: data.id,
      dateString: convertToDateString(data.date!),
      note: data.note
    }
    navigation.navigate('RecentMoodDetailView', { moodData: navigationData });
  }

  // Manipula o clique no botão de edição do perfil
  const handleEditButtonPress = () => {
    navigation.navigate('EditAccountDetails');
  }

  // Manipula o clique no botão Moodify
  const handleMoodifyPress = () => {
    navigation.navigate('MoodifyScreen');
  }

  // Abre a galeria para selecionar uma imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      let imageUriString = result.assets[0].uri;
      await convertImageToBytes(imageUriString);
    } 
  };

  // Converte a imagem selecionada em bytes e a envia para o servidor
  const convertImageToBytes = async (imageUri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
      setImageBytes(base64);

      const body: UpdateImageType = {
        profile_img: `${generateRandomString({ length: 223 })}==`
      }

      await updateProfileImage(body);
    } catch (error) {
      console.error('Error converting image to bytes:', error);
    }
  };

  // Manipula a alteração da foto de perfil
  const handleProfilePictureChange = async () => {
    await pickImage();
  };

  return (
    <ImageBackground 
     source={require("../../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>

      <ScrollView 
       showsVerticalScrollIndicator={false}
       style={styles.scrollview}
       refreshControl={
         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
       }>
        <View style={styles.absoluteContainer}>
          <StatusBar style="auto" />
          <Image 
           source={require(profileBackgroundPath)}
           resizeMode="cover"/>

          <TouchableOpacity 
           style={styles.profilePicture}
           onPress={handleProfilePictureChange}>
            <Image 
              source={imageBytes ? { uri: `data:image/png;base64,${imageBytes}` } : require(profilePicturePath)} 
              style={styles.profileImage}/>
          </TouchableOpacity>
        </View>

        <View style={styles.reset}/>

        <View style={styles.container}>
          <View style={styles.usernameEditContainer}>
            <TouchableOpacity
             onPress={handleEditButtonPress}>
              <FontAwesome 
                name={"edit"} 
                size={25} 
                style={styles.usernameEditIcon}/>
            </TouchableOpacity>
            <Text style={styles.userName}>
              {global.userData.username}
            </Text>
          </View>

          <Text style={styles.streakKind}>
            {global.userData.streakKind != "null" ? global.userData.streakKind : "You don't have a streak yet"}
          </Text>

          <MoodifyButton handlePress={handleMoodifyPress}/>

          <View style={styles.recentMoodsContainer}>
            {
                global.userData.recentMoods.map((mood: DefaultMoodType) => (
                  <MoodCardBuilder 
                   mood={mood}
                   buttonSize={130}
                   iconBorderStyle={{borderWidth: 2, borderRadius: 20,
                    borderBottomWidth: 7,
                    borderRightWidth: 7}}
                   middleTextString={convertToDateString(mood.date!)}
                   iconBackgroundColor={"#EEEEEE"}
                   key={generateRandomString({ length: 16 })}
                   handlePress={handleRecentMoodPress}/>
                ))
            }
          </View>
        </View>
        <TouchableOpacity
         onPress={generateTestData}>
          <Text>Gerar dados de teste</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const profilePicProportion: DimensionValue = 150;

const styles = StyleSheet.create({
  scrollview: {
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },

  absoluteContainer: {
    position: 'relative',
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
    width: profilePicProportion,
    height: profilePicProportion,
  },
  
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderBottomWidth: 7,
    borderRightWidth: 7
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
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  filterIcon: {
  },
  
  usernameEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlignVertical: 'center',
  },

  usernameEditIcon : {
    alignSelf: 'center',
  }
});
