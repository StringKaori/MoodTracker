import React from 'react';
import { DimensionValue, StyleSheet, View} from 'react-native';
import { MoodTypes } from './Enums/MoodTypes'; 

interface MoodIconBuilderType {
    mood: MoodTypes,
    buttonSize: DimensionValue
}

export default function MoodIconBuilder(props: MoodIconBuilderType) {
    return (
        <View>
            
        </View>
    );
}


const styles = StyleSheet.create({
    
});
