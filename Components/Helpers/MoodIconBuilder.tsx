// Componente para exibir um ícone de humor com tamanho e estilo personalizados
import React, { useState } from 'react';
import { DimensionValue, StyleSheet, View, Image, StyleProp, ImageStyle } from 'react-native';
import { MoodTypesString } from './Enums/MoodTypes';
import { MoodImages } from './Consts/MoodImages';

// Tipagem das propriedades esperadas pelo componente MoodIconBuilder
interface MoodIconBuilderType {
    moodName: MoodTypesString,
    buttonSize: DimensionValue,
    iconBorderStyle?: StyleProp<ImageStyle>,
    backgroundColor?: string,
}

// Componente que exibe um ícone de humor com base nas propriedades fornecidas
export default function MoodIconBuilder(props: MoodIconBuilderType) {
    const proportion = { width: props.buttonSize, height: props.buttonSize };
    const backgroundColorValue = props.backgroundColor ?? 'transparent'; // Define a cor de fundo, se fornecida

    return (
        <View style={[styles.container, proportion]}>
            <Image 
             source={MoodImages[props.moodName]} 
             style={[styles.image, props.iconBorderStyle, { backgroundColor: backgroundColorValue }]} />
        </View>
    );
}

// Estilos para o componente MoodIconBuilder
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
