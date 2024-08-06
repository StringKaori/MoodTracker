import React, { useState } from 'react';
import { DimensionValue, StyleSheet, View, Image, StyleProp, ImageStyle } from 'react-native';
import { MoodTypesString } from './Enums/MoodTypes';
import { MoodImages } from './Consts/MoodImages';

interface MoodIconBuilderType {
    moodName: MoodTypesString,
    buttonSize: DimensionValue,
    iconBorderStyle?: StyleProp<ImageStyle>,
    backgroundColor?: string,
}

export default function MoodIconBuilder(props: MoodIconBuilderType) {
    const proportion = {width: props.buttonSize, height: props.buttonSize}
    const backgroundColorValue = props.backgroundColor ?? `transparent`

    return (
        <View style={[styles.container, proportion, {backgroundColor: backgroundColorValue}]}>
            <Image 
             source = { MoodImages[props.moodName] }
             style = { [styles.image, props.iconBorderStyle] }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5
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
