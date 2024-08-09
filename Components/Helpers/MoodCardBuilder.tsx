import { View, TouchableOpacity, StyleSheet, Text, StyleProp, ImageStyle } from "react-native";
import { MoodTypes, MoodTypesString, MoodTypesColor } from "./Enums/MoodTypes";
import MoodIconBuilder from "./MoodIconBuilder";
import DefaultMoodType from "./Interfaces/DefaultMoodType";

interface BuilderPropsType {
    mood: DefaultMoodType,
    buttonSize: number,
    middleTextString?: string,
    iconBorderStyle?: StyleProp<ImageStyle>,
    iconBackgroundColor?: string,
    handlePress?: (data: DefaultMoodType) => void,
}

interface ContentPropsType {
    mood: DefaultMoodType,
    buttonSize: number,
    middleTextValue: string,
    iconBorderStyle?: StyleProp<ImageStyle>,
    iconBackgroundColor?: string,
}

export default function MoodCardBuilder(props: BuilderPropsType) {
    var middleText = props.middleTextString ??
                     props.mood.dateString ?? ""

    const contentCard = <MoodCardContent 
                         buttonSize={props.buttonSize}
                         mood={props.mood}
                         middleTextValue={middleText}
                         iconBorderStyle={props.iconBorderStyle}
                         iconBackgroundColor = {props.iconBackgroundColor} />
    return(
        <View 
         style = { styles.recentMoodsItem }>
            { props.handlePress ? (
                <TouchableOpacity 
                 onPress={() => props.handlePress!(props.mood)}>
                    { contentCard }
                </TouchableOpacity>
              ) : ( contentCard )
            }
        </View>
    );
}

const MoodCardContent = (props: ContentPropsType) => {
    return(
        <>
            <MoodIconBuilder 
             moodName={MoodTypes[props.mood.id] as MoodTypesString} 
             iconBorderStyle={props.iconBorderStyle}
             buttonSize={props.buttonSize}
             backgroundColor = {props.iconBackgroundColor}/>

            <Text style={styles.recentMoodsItemText}>{props.middleTextValue}</Text>

            <Text style = { [styles.recentMoodsLabel, {backgroundColor: MoodTypesColor[MoodTypes[props.mood.id] as keyof typeof MoodTypesColor]}] }>
                {MoodTypes[props.mood.id]}
            </Text>
        </>
    )
}

const styles = StyleSheet.create({  
      recentMoodsItem: {
      },
    
      recentMoodsItemText: {
        textAlign: `center`,
      },
    
      recentMoodsLabel: {
        marginTop: 6,
        marginBottom: 20,
        textAlign: `center`,
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2,
        fontWeight: `500`
      }
})