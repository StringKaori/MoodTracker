import React from 'react';
import { DimensionValue, StyleSheet, TouchableOpacity, Image, StyleProp, ImageStyle } from 'react-native';
import { MoodTypesString } from './Enums/MoodTypes';
import { MoodImages } from './Consts/MoodImages';

interface MoodIconBuilderType {
    moodName: MoodTypesString,
    buttonSize: DimensionValue,
    iconBorderStyle?: StyleProp<ImageStyle>
}

export default function MoodIconBuilder(props: MoodIconBuilderType) {
    const proportion = {width: props.buttonSize, height: props.buttonSize}
    return (
        <TouchableOpacity 
         style={[styles.container, proportion]}>
            <Image 
             source = { MoodImages[props.moodName] }
             style = { [styles.image, props.iconBorderStyle] }/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    image: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});
