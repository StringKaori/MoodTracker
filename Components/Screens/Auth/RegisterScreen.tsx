// Tela de registro do usuário com validações e funcionalidades de autenticação
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthScreenNavigationProp } from '../../../TypeScriptConvenienceFiles/navigation';
import { DifferentPasswordsError, EmptyFieldError, InvalidEmailError } from '../../Helpers/Errors/ErrorTexts';
import WarningModal from '../../Helpers/Errors/WarningModal';
import { RegisterBodyType } from '../../Helpers/Interfaces/RequestTypes';
import { registerUser } from '../../Helpers/RequestBase';

type AuthScreenProps = {
    navigation: AuthScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: AuthScreenProps) {
  // Estado para armazenar os valores dos campos de entrada
  const [emailInput, setEmailInput] = useState<string>('');
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');

  // Estado para controlar a visibilidade das senhas
  const [seePasswordIcon, setSeePasswordIcon] = useState<string>('eye-slash');
  const [seeConfirmPasswordIcon, setSeeConfirmPasswordIcon] = useState<string>('eye-slash');
  const [shouldHidePassword, setShouldHidePassword] = useState<boolean>(true);
  const [shouldHideConfirmPassword, setShouldHideConfirmPassword] = useState<boolean>(true);

  // Estado para verificar a validade dos campos e senhas
  const [isUsernameInputEmpty, setIsUsernameInputEmpty] = useState<boolean>(false);
  const [isEmailInputEmpty, setIsEmailInputEmpty] = useState<boolean>(false);
  const [isPasswordInputEmpty, setIsPasswordInputEmpty] = useState<boolean>(false);
  const [isConfirmPasswordInputEmpty, setIsConfirmPasswordInputEmpty] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [passwordAreTheSame, setPasswordAreTheSame] = useState<boolean>(true);
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  // Função para alternar a visibilidade da senha
  const handlePasswordVisibilityPress = (
    icon: string,
    shouldHide: boolean,
    setIcon: React.Dispatch<React.SetStateAction<string>>,
    setShouldHide: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    let newState = icon === "eye-slash" ? "eye" : "eye-slash";
    setIcon(newState);
    setShouldHide(!shouldHide);
  }

  // Função para lidar com a ação de registro
  const handleRegisterAction = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifica se os campos estão vazios
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

    const emailIsValid = emailRegex.test(emailInput);
    setIsEmailValid(emailIsValid);

    const passwordAreTheSame = passwordInput === confirmPasswordInput;
    setPasswordAreTheSame(passwordAreTheSame);

    if (!passwordAreTheSame || !emailIsValid) { return; }

    const body: RegisterBodyType = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    }

    registerUser(body)
    .then((data) => {
      setShouldShowModal(true);
      setIsSuccess(true);
      setModalMessage('User registered successfully!');
    })
    .catch((error) => {
      setShouldShowModal(true);
      setModalMessage(error.response.data.message);
      throw error;
    });
  }

  // Função para lidar com o fechamento do modal
  const handleModalClose = () => {
    setShouldShowModal(false);
    if (isSuccess) { navigation.goBack(); }
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
          {isUsernameInputEmpty && <EmptyFieldError />}
          
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type your e-mail here"
              value={emailInput}
              onChangeText={setEmailInput}
            />
          </View>
          {isEmailInputEmpty && <EmptyFieldError />}
          {!isEmailValid && <InvalidEmailError />}
          
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
                handlePasswordVisibilityPress(seePasswordIcon, shouldHidePassword, setSeePasswordIcon, setShouldHidePassword)}
              style={styles.passwordEye}>
              <FontAwesome 
                name={seePasswordIcon}
                size={20} /> 
            </TouchableOpacity>
          </View>
          {isPasswordInputEmpty && <EmptyFieldError />}
          {!passwordAreTheSame && <DifferentPasswordsError />}

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
                handlePasswordVisibilityPress(seeConfirmPasswordIcon, shouldHideConfirmPassword, setSeeConfirmPasswordIcon, setShouldHideConfirmPassword)}
              style={styles.passwordEye}>
              <FontAwesome 
                name={seeConfirmPasswordIcon}
                size={20} /> 
            </TouchableOpacity>
          </View>
          {isConfirmPasswordInputEmpty && <EmptyFieldError />}
          {!passwordAreTheSame && <DifferentPasswordsError />}

        </View>

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={handleRegisterAction}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

      </View>

      <WarningModal
        visible={shouldShowModal} 
        onClose={handleModalClose}
        message={modalMessage} />

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
    marginTop: 4,
  },
  input: {
    height: 40,
    width: '98%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  passwordEye: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  registerButton: {
    backgroundColor: '#A3EAFB',
    height: 40,
    width: 200,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 20,
    marginTop: 12,
  },
  registerButtonText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
