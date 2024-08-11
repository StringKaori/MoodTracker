// Componente de botão para registrar o humor com um emoji e um texto
import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

const registerMoodButtonTitle: string = "Have you recorded your mood today? Moodify now!";

interface MoodifyButtonProps {
    handlePress: () => void;
}

export default function MoodifyButton(props: MoodifyButtonProps) {

    return (
        <View>
            <TouchableOpacity 
                style={styles.button}
                onPress={props.handlePress}>
                <Image 
                    source={require("../../assets/Images/Emojis/MoodifyButtonEmoji.png")}
                    style={styles.image}/>
                <Text
                    style={styles.text}>
                    {registerMoodButtonTitle}
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#a3eafb',
        height: 86,
        width: 328,
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 2,
        borderBottomWidth: 7,
        borderRightWidth: 7
    },
    image: {
        alignSelf: 'flex-start',
        height: 66,
        width: 66,
        marginVertical: 5,
        marginHorizontal: 10
    },
    text: {
        flex: 1,
        flexWrap: 'wrap',
        alignSelf: 'center',
        fontSize: 18
    },
});
