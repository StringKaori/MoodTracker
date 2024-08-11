import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthScreenNavigationProp } from '../../../TypeScriptConvenienceFiles/navigation';
import { CommonActions } from '@react-navigation/native';
import { LoginBodyType, UserDataType } from '../../Helpers/Interfaces/RequestTypes';
import { getHomeData, updateToken, userLogin } from '../../Helpers/RequestBase';
import WarningModal from '../../Helpers/Errors/WarningModal';

type AuthScreenProps = {
  navigation: AuthScreenNavigationProp;
};

export default function LoginScreen({ navigation }: AuthScreenProps) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [seePasswordIcon, setSeePasswordIcon] = useState<string>('eye-slash')
  const [shouldHidePassword, setShouldHidePassword] = useState<boolean>(true)
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>("")

  // Helper functions
  const handlePasswordVisibilityPress = () => {
    let newState = seePasswordIcon == "eye-slash" ? "eye" : "eye-slash"
    setSeePasswordIcon(newState)
    setShouldHidePassword(!shouldHidePassword)
  }

  const fetchHomeData = async () => {
    try {
      const result: UserDataType = await getHomeData();
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      global.userData = result; 
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  const handleLoginAction = () => {
    const body: LoginBodyType = {
      email: emailInput,
      password: passwordInput,
    }

    userLogin(body)
    .then((data) => {
      global.token = data.signToken
      updateToken()
      fetchHomeData()
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeNavigator' }],
        })
      );
    })

    .catch((error) => {
      setShouldShowModal(true);
      setModalMessage(error.response.data.message)
      // throw error;
    });
    
  }

  const handleRegisterAction = () => {
    navigation.navigate('Register')
  }

  return (
    <ImageBackground 
      source={require("../../../assets/Images/AppBackground.png")}
      resizeMode="cover"
      style={styles.background}>

      <View style={styles.centeredView}>
        <Text style={styles.title}>
          Spectrum Mood Tracker
        </Text>

        <View>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your e-mail here"
              value={emailInput}
              onChangeText={setEmailInput}
            />
          </View>
          
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your password here"
              value={passwordInput}
              onChangeText={setPasswordInput}
              secureTextEntry={shouldHidePassword}
            />
            <TouchableOpacity
             onPress={handlePasswordVisibilityPress}
             style = {styles.passwordEye}>
              <FontAwesome 
                name = {seePasswordIcon}
                size = {20} /> 
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.linkContainer}>
          <Text style={styles.createAccountText}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={handleRegisterAction}>
            <Text style={[styles.createAccountText, styles.linkText]}>Click Here</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
         style={styles.loginButton}
         onPress={handleLoginAction}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

      </View>

      <WarningModal
       visible = {shouldShowModal} 
       onClose={() => setShouldShowModal(false)}
       message={ modalMessage } />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: `600`,
    marginBottom: 50
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
    marginTop: 12,
  },
  input: {
    height: 40,
    width: `98%`,
    backgroundColor: `white`,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 16,
    marginBottom: 8,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: `#A3EAFB`,
    height: 40,
    width: 200,
    justifyContent: `center`,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 20
  },
  loginButtonText: {
    fontSize: 20,
    textAlign: `center`,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  passwordEye: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  }
});
