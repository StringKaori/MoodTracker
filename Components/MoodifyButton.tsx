import { StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const registerMoodButtonTitle: string = "Have you recorded your mood today? Moodify now!"

export default function MoodifyButton() {
  return (
    <TouchableOpacity 
     style={styles.button}>
        <Image 
         source = {require("../assets/Images/Emojis/MoodifyButtonEmoji.png")}
         style = {styles.image}/>
        <Text
         style = {styles.text}>
            {registerMoodButtonTitle}
        </Text>
    </TouchableOpacity>
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
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 3,
        elevation: 10
    },
    image: {
        alignSelf:'flex-start',
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
    }
});
