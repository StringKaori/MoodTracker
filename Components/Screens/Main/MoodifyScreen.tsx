import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MoodIconBuilder from '../../Helpers/MoodIconBuilder';
import { MoodTypes, MoodTypesColor, MoodTypesString } from '../../Helpers/Enums/MoodTypes';
import { useState } from 'react';
import { CharacterLimitReached } from '../../Helpers/Errors/ErrorTexts';

export default function MoodifyScreen() {
    const moodTypes = Object.values(MoodTypesString)
    const [noteInput, setNoteInput] = useState('');
    const [shouldShowError, setShouldShowError] = useState(false);
    const [selectedMoodID, setSelectedMoodID] = useState<number>();
    const [selectedMood, setSelectedMood] = useState<MoodTypesString>();

    const handleNoteInputChange = (text: string) => {
        const isTextInvalid = text.length > 360
        setShouldShowError(isTextInvalid)
        if(isTextInvalid) { return }

        setNoteInput(text)
    }

    const handleSelectedMood = (mood: MoodTypesString) => {
        setSelectedMoodID(MoodTypes[mood as keyof typeof MoodTypes])
        setSelectedMood(mood)
    }

    return (
        <ImageBackground 
         source={require("../../../assets/Images/AppBackground.png")}
         resizeMode="cover"
         style={styles.background}>
            <StatusBar style="auto" />

            <View style={ styles.container }>
                <Text style={ styles.title }>How are you feeling today?</Text>
                <ScrollView 
                 style = { styles.moodIconsView }
                 contentContainerStyle={styles.scrollViewContent}
                 showsVerticalScrollIndicator={true}>
                    <View style={styles.wrapper}>
                        {
                            moodTypes.map(mood => (
                                <TouchableOpacity 
                                 key={ mood }
                                 onPress={ () => handleSelectedMood(mood) }>
                                    <MoodIconBuilder
                                     moodName = { mood } 
                                     buttonSize = { 70 }/>
                                    <Text style = { 
                                        [styles.moodsLabel,
                                        {backgroundColor: MoodTypesColor[mood as keyof typeof MoodTypesColor]}]}>
                                            { mood }
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
                
                {
                    selectedMood &&
                    <View style={styles.selectedMoodContainer}>
                        <Text>Mood Selecionado:</Text>
                        <View style={styles.selectedMoodCard}>
                            <MoodIconBuilder
                                moodName = { selectedMood } 
                                buttonSize = { 70 }/>
                            <Text style = { 
                                [styles.moodsLabel,
                                {backgroundColor: MoodTypesColor[selectedMood as keyof typeof MoodTypesColor]}]}>
                                    { selectedMood }
                            </Text>
                        </View>
                    </View>
                }

                <TextInput
                 style={styles.textArea}
                 multiline={true}
                 numberOfLines={4}
                 onChangeText={handleNoteInputChange}
                 value={noteInput}
                 placeholder="Type something..." />
                 { shouldShowError && <CharacterLimitReached/> }
                 <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueText}>Continue</Text>
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
    container: {
        flex: 1,
        alignItems: `center`,
        borderRadius: 20,
        padding: 35,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 5
    },
    moodIconsView : {
        backgroundColor: `white`,
        borderColor: `black`,
        borderWidth: 1,
        borderRadius: 10,
        width: `100%`,
        maxHeight: '40%',
        marginBottom: 20 
    },
    scrollViewContent: {
        flexGrow: 1,
        padding: 5
    },
    wrapper: {
        flexDirection: `row`,
        flexWrap: `wrap`,
        justifyContent: 'space-evenly',
        height: `50%`
    },
    moodsLabel: {
        textAlign: `center`,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2,
        fontWeight: `500`
    },
    textArea: {
        height: 150,
        width: '100%',
        borderColor: 'gray',
        backgroundColor: `white`,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top'
    },
    selectedMoodContainer: {
        flexDirection: `row`,
        alignSelf: `flex-start`,
        alignItems: `center`,
        marginBottom: 20 
    },
    selectedMoodCard: {

    },
    continueButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a3eafb',
        height: 50,
        width: 200,
        borderRadius: 25,
        borderColor: 'black',
        borderWidth: 3
    },
    continueText: {
        flex: 1,
        fontSize: 26,
        textAlign: `center`
    }
});
