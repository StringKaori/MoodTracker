import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DifferentPasswordsError, EmptyFieldError, InvalidEmailError, UnnavailableEmailError, UnnavailableUsernameError } from '../../Helpers/Errors/ErrorTexts';
import { AuthScreenNavigationProp } from '../../../TypeScriptConvenienceFiles/navigation';

type AuthScreenProps = {
    navigation: AuthScreenNavigationProp;
};

export default function RegisterScreen( { navigation }: AuthScreenProps ) {
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
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [passwordAreTheSame, setPasswordAreTheSame] = useState<boolean>(true)

  // unnavailable helpers
  const [unnavailableEmail, setUnnavailableEmail] = useState<boolean>(false)
  const [unnavailableUsername, setUnnavailableUsername] = useState<boolean>(false)

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isUsernameInputEmpty = usernameInput === "";
    const isEmailInputEmpty = emailInput === "";
    const isPasswordInputEmpty = passwordInput === "";
    const isConfirmPasswordInputEmpty = confirmPasswordInput === "";

    setIsUsernameInputEmpty(isUsernameInputEmpty);
    setIsEmailInputEmpty(isEmailInputEmpty);
    setIsPasswordInputEmpty(isPasswordInputEmpty);
    setIsConfirmPasswordInputEmpty(isConfirmPasswordInputEmpty);

    const canProceed = !isUsernameInputEmpty &&
                       !isEmailInputEmpty &&
                       !isPasswordInputEmpty &&
                       !isConfirmPasswordInputEmpty;

    if (!canProceed) { return; }

    const emailIsValid = emailRegex.test(emailInput)
    setIsEmailValid(emailIsValid)

    const passwordAreTheSame = passwordInput === confirmPasswordInput;
    setPasswordAreTheSame(passwordAreTheSame);

    if (!passwordAreTheSame || !emailIsValid) { return; }

    const body = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    }

    // chamada para o back
    // load screen
    // setUnnavailableEmail(false)
    // setUnnavailableUsername(false)

    // retorno falha
      // se sem internet ou conexão com o back
        // mostrar mensagem de erro

      // se email já utilizado
        // setUnnavailableEmail(true)
      
      // se username já utilizado
        // setUnnavailableUsername(true)

    // retorno sucesso
    navigation.goBack()
}

  return (
    <ImageBackground 
      source={require("../../../assets/Images/AppBackground.png")}
      resizeMode="cover"
      style={styles.background}>

      <View style={styles.centeredView}>

        <View>
          <Text style={styles.label}>Username</Text>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your username here"
              value={usernameInput}
              onChangeText={setUsernameInput}
            />
          </View>
          { isUsernameInputEmpty && <EmptyFieldError/> }
          { unnavailableUsername && <UnnavailableUsernameError/> }
          
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your e-mail here"
              value={emailInput}
              onChangeText={setEmailInput}
            />
          </View>
          { isEmailInputEmpty && <EmptyFieldError/> }
          { !isEmailValid && <InvalidEmailError/> }
          { unnavailableEmail && <UnnavailableEmailError/> }
          
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
             onPress={() =>
                handlePasswordVisibilityPress(seePasswordIcon,
                                              shouldHidePassword,
                                              setSeePasswordIcon,
                                              setShouldHidePassword)}
             style = {styles.passwordEye}>
              <FontAwesome 
                name = {seePasswordIcon}
                size = {20} /> 
            </TouchableOpacity>
          </View>
          { isPasswordInputEmpty && <EmptyFieldError/> }
          { !passwordAreTheSame && <DifferentPasswordsError/> }

          <Text style={styles.label}>Password confirmation</Text>
          <View style={styles.inputContainer}>
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
                                              setShouldHideConfirmPassword)}
             style = {styles.passwordEye}>
              <FontAwesome 
                name = {seeConfirmPasswordIcon}
                size = {20}/> 
            </TouchableOpacity>
          </View>
          { isConfirmPasswordInputEmpty && <EmptyFieldError/> }
          { !passwordAreTheSame && <DifferentPasswordsError/> }

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
    width: `98%`,
    backgroundColor: `white`,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row'
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
