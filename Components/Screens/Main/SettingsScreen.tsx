import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  return (
    <ImageBackground 
     source={require("../../../assets/Images/AppBackground.png")}
     resizeMode="cover"
     style={styles.background}>
      <StatusBar style="auto" />
      
      <View style={styles.container}>
        <TouchableOpacity style = {styles.button}>
          <Text> Profile Preferences </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: `100%`,
    backgroundColor: `#EEEEEE`
  }
});
