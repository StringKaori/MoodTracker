import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UserChangeType } from "./Interfaces/RequestTypes";

export default function EditAccountDetailsScreen() {
    const [username, setUsername] = useState(global.userData.username);
    const [email, setEmail] = useState(global.userData.email);
    const [password, setPassword] = useState(global.userData.password);

    const [seePasswordIcon, setSeePasswordIcon] = useState<string>('eye-slash');
    const [shouldHidePassword, setShouldHidePassword] = useState<boolean>(true);

    const hasChanges = () => {
        return (
            username !== global.userData.username ||
            email !== global.userData.email ||
            password !== global.userData.password
        );
    };

    const handlePasswordVisibilityPress = () => {
        const newIcon = seePasswordIcon === "eye-slash" ? "eye" : "eye-slash";
        setSeePasswordIcon(newIcon);
        setShouldHidePassword(!shouldHidePassword);
    };

    const handleSaveChanges = () => {
        const body: UserChangeType = {};

        if (username !== global.userData.username) {
            body.username = username;
        }
    
        if (email !== global.userData.email) {
            body.email = email;
        }
    
        if (password !== global.userData.password) {
            body.password = password;
        }
    
        console.log(body);
    }

    return (
        <ImageBackground 
         source={require("../../assets/Images/AppBackground.png")}
         resizeMode="cover"
         style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.label}>Username: </Text>
                <TextInput 
                    style={styles.textContainer}
                    value={username}
                    onChangeText={setUsername}
                />

                <Text style={styles.label}>Email: </Text>
                <TextInput 
                    style={styles.textContainer}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Password: </Text>
                <View style={styles.passwordContainer}>
                    <TextInput 
                        style={styles.textContainer}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={shouldHidePassword}
                    />
                    <TouchableOpacity
                        onPress={handlePasswordVisibilityPress}
                        style={styles.passwordEye}>
                        <FontAwesome 
                            name={seePasswordIcon}
                            size={20} /> 
                    </TouchableOpacity>
                </View>

                {hasChanges() && (
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleSaveChanges}
                    >
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: '1%',
        fontSize: 16,
        marginBottom: 4,
        marginTop: 4,
    },
    textContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        textAlign: 'left',
        padding: 5,
        borderRadius: 10,
        width: '98%',
        height: 40,
        marginBottom: 20,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordEye: {
        position: 'absolute',
        right: 15,
        top: '30%',
        transform: [{ translateY: -10 }],
    },
    button: {
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '50%',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
