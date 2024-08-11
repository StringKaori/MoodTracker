// Componente para construir e exibir um cartão de humor
import { View, TouchableOpacity, StyleSheet, Text, StyleProp, ImageStyle } from "react-native";
import { MoodTypes, MoodTypesString, MoodTypesColor } from "./Enums/MoodTypes";
import MoodIconBuilder from "./MoodIconBuilder";
import DefaultMoodType from "./Interfaces/DefaultMoodType";

// Tipagem das propriedades esperadas pelo componente MoodCardBuilder
interface BuilderPropsType {
    mood: DefaultMoodType,
    buttonSize: number,
    middleTextString?: string,
    iconBorderStyle?: StyleProp<ImageStyle>,
    iconBackgroundColor?: string,
    handlePress?: (data: DefaultMoodType) => void,
}

// Tipagem das propriedades esperadas pelo componente MoodCardContent
interface ContentPropsType {
    mood: DefaultMoodType,
    buttonSize: number,
    middleTextValue: string,
    iconBorderStyle?: StyleProp<ImageStyle>,
    iconBackgroundColor?: string,
}

// Componente principal que constrói um cartão de humor
export default function MoodCardBuilder(props: BuilderPropsType) {
    var middleText = props.middleTextString ?? ""; // Define o texto do meio, se fornecido

    const contentCard = <MoodCardContent 
                         buttonSize={props.buttonSize}
                         mood={props.mood}
                         middleTextValue={middleText}
                         iconBorderStyle={props.iconBorderStyle}
                         iconBackgroundColor={props.iconBackgroundColor} />
                         
    return(
        <View style={styles.moodsItem}>
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

// Componente auxiliar que exibe o conteúdo do cartão de humor
const MoodCardContent = (props: ContentPropsType) => {
    return(
        <>
            <MoodIconBuilder 
             moodName={MoodTypes[props.mood.id] as MoodTypesString} 
             iconBorderStyle={props.iconBorderStyle}
             buttonSize={props.buttonSize}
             backgroundColor={props.iconBackgroundColor}/>

            <Text style={styles.moodsItemText}>{props.middleTextValue}</Text>

            <Text style={[styles.moodsLabel, {backgroundColor: MoodTypesColor[MoodTypes[props.mood.id] as keyof typeof MoodTypesColor]}]}>
                {MoodTypes[props.mood.id]}
            </Text>
        </>
    )
}

// Estilos para o componente MoodCardBuilder e seus subcomponentes
const styles = StyleSheet.create({  
      moodsItem: {
      },
    
      moodsItemText: {
        textAlign: 'center',
      },
    
      moodsLabel: {
        marginTop: 6,
        marginBottom: 20,
        textAlign: 'center',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 2,
        fontWeight: '500',
      }
});
