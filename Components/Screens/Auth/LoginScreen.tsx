import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthScreenNavigationProp } from '../../../TypeScriptConvenienceFiles/navigation';
import { EmailOrPasswordIsWrongError } from '../../Helpers/Errors/ErrorTexts';
// npm install axios
// import axios from 'axios';

type AuthScreenProps = {
  navigation: AuthScreenNavigationProp;
};

export default function LoginScreen({ navigation }: AuthScreenProps) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [seePasswordIcon, setSeePasswordIcon] = useState<string>('eye-slash')
  const [shouldHidePassword, setShouldHidePassword] = useState<boolean>(true)
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState<boolean>(false)

  // Helper functions
  const handlePasswordVisibilityPress = () => {
    let newState = seePasswordIcon == "eye-slash" ? "eye" : "eye-slash"
    setSeePasswordIcon(newState)
    setShouldHidePassword(!shouldHidePassword)
  }

  const handleLoginAction = () => {
    const body = {
      email: emailInput,
      password: passwordInput,
    }
    // chamada para o back
    // setWrongEmailOrPassword(false) 

    // caso falha
      // se sem internet ou back offline
        // mostrar mensagem de erro

      // se email ou senha inválidos
        // setWrongEmailOrPassword(true)

    // caso sucesso
    navigation.navigate('HomeNavigator')
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

        <View>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your e-mail here"
            value={emailInput}
            onChangeText={setEmailInput}
          />
          
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your password here"
              value={passwordInput}
              onChangeText={setPasswordInput}
              secureTextEntry={shouldHidePassword}
            />
            <TouchableOpacity
             onPress={handlePasswordVisibilityPress}>
              <FontAwesome 
                name = {seePasswordIcon}
                size = {20}
                style = {styles.passwordEye} /> 
            </TouchableOpacity>
          </View>
          { wrongEmailOrPassword && <EmailOrPasswordIsWrongError/> }
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

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    width: 380,
    backgroundColor: `white`,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 6,
    paddingHorizontal: 8,
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
  passwordInputContainer: {
    flexDirection: 'row',
    position: 'relative'
  },
  passwordEye: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -16 }],
  }
});
