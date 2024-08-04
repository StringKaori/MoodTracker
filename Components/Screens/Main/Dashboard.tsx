import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ImageBackground} from 'react-native';

export default function Dashboard() {
  return (
    <ImageBackground 
    source={require("../../../assets/Images/AppBackground.png")}
    resizeMode="cover"
    style={styles.background}>
      <StatusBar style="auto" />

      <View style={styles.container}>
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
});
