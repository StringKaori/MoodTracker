import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, // This makes the view cover the entire screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        zIndex: 1000, // Ensure it's on top of other views (if needed)
    },
    text: {
        color: '#fff', // Text color for contrast against the background
        marginTop: 10, // Space between the activity indicator and the text
    },
});
