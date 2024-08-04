import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DifferentPasswordsError, EmptyFieldError } from '../../Helpers/Errors/ErrorTexts';

export default function RegisterScreen() {
  // inputs
  const [emailInput, setEmailInput] = useState<string>('');
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');

  // password visibility
  const [seePasswordIcon, setSeePasswordIcon] = useState<string>('eye-slash')
  const [seeConfirmPasswordIcon, setSeeConfirmPasswordIcon] = useState<string>('eye-slash')
  const [shouldHidePassword, setShouldHidePassword] = useState<boolean>(true)
  const [shouldHideConfirmPassword, setShouldHideConfirmPassword] = useState<boolean>(true)

  // registration verifiers
  const [isUsernameInputEmpty, setIsUsernameInputEmpty] = useState<boolean>(false)
  const [isEmailInputEmpty, setIsEmailInputEmpty] = useState<boolean>(false)
  const [isPasswordInputEmpty, setIsPasswordInputEmpty] = useState<boolean>(false)
  const [isConfirmPasswordInputEmpty, setIsConfirmPasswordInputEmpty] = useState<boolean>(false)
  const [passwordAreNotTheSame, setPasswordAreNotTheSame] = useState<boolean>(false)

  // Helper functions
  const handlePasswordVisibilityPress = (icon: String,
                                         shouldHide: boolean,
                                         setIcon: React.Dispatch<React.SetStateAction<string>>,
                                         setShouldHide: React.Dispatch<React.SetStateAction<boolean>>) => {
    let newState = icon == "eye-slash" ? "eye" : "eye-slash"
    setIcon(newState)
    setShouldHide(!shouldHide)
  }

  const handleRegisterAction = () => {
    setIsUsernameInputEmpty(!usernameInput ? true : false)
    setIsEmailInputEmpty(!emailInput ? true : false)
    setIsPasswordInputEmpty(!passwordInput ? true : false)
    setIsConfirmPasswordInputEmpty(!confirmPasswordInput ? true : false)
    setPasswordAreNotTheSame(passwordInput != confirmPasswordInput ? true : false)
    let canProceed: boolean = !isUsernameInputEmpty &&
                              !isEmailInputEmpty &&
                              !isPasswordInputEmpty &&
                              !isConfirmPasswordInputEmpty &&
                              passwordAreNotTheSame 
    
    if(canProceed) {
        console.log("*** Username: ", usernameInput)
        console.log("*** E-mail: ", emailInput)
        console.log("*** Password: ", passwordInput)
    }
  }

  return (
    <ImageBackground 
      source={require("../../../assets/Images/AppBackground.png")}
      resizeMode="cover"
      style={styles.background}>

      <View style={styles.centeredView}>

        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your username here"
            value={usernameInput}
            onChangeText={setUsernameInput}
          />
          { isUsernameInputEmpty && <EmptyFieldError/> }
          
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your e-mail here"
            value={emailInput}
            onChangeText={setEmailInput}
          />
          { isEmailInputEmpty && <EmptyFieldError/> }
          
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
             onPress={() =>
                handlePasswordVisibilityPress(seePasswordIcon,
                                              shouldHidePassword,
                                              setSeePasswordIcon,
                                              setShouldHidePassword)}>
              <FontAwesome 
                name = {seePasswordIcon}
                size = {20}
                style = {styles.passwordEye} /> 
            </TouchableOpacity>
          </View>
          { isPasswordInputEmpty && <EmptyFieldError/> }
          { passwordAreNotTheSame && <DifferentPasswordsError/> }

          <Text style={styles.label}>Password confirmation</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your password here"
              value={confirmPasswordInput}
              onChangeText={setConfirmPasswordInput}
              secureTextEntry={shouldHideConfirmPassword}
            />
            <TouchableOpacity
             onPress={() =>
                handlePasswordVisibilityPress(seeConfirmPasswordIcon,
                                              shouldHideConfirmPassword,
                                              setSeeConfirmPasswordIcon,
                                              setShouldHideConfirmPassword)}>
              <FontAwesome 
                name = {seeConfirmPasswordIcon}
                size = {20}
                style = {styles.passwordEye} /> 
            </TouchableOpacity>
          </View>
          { isConfirmPasswordInputEmpty && <EmptyFieldError/> }
          { passwordAreNotTheSame && <DifferentPasswordsError/> }

        </View>

        <TouchableOpacity 
         style={styles.registerButton}
         onPress={handleRegisterAction}>
          <Text style={styles.registerButtonText}>Register</Text>
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
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 4
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
  passwordInputContainer: {
    flexDirection: 'row',
    position: 'relative'
  },
  passwordEye: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  registerButton: {
    backgroundColor: `#A3EAFB`,
    height: 40,
    width: 200,
    justifyContent: `center`,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 20,
    marginTop: 12
  },
  registerButtonText: {
    fontSize: 20,
    textAlign: `center`,
  }
});