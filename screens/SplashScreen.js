// SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import * as SplashScreen from 'expo-splash-screen';

// prevent auto-hiding of the splash screen
SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading and navigate after the animation ends
    setTimeout(async () => {
      await SplashScreen.hideAsync(); // Hide the native splash screen
      navigation.replace('Home'); // Navigate to the Home screen or another screen
    }, 5000); // Adjust time (5000ms = 5 seconds)
  }, []);

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <LottieView
        source={require('../assets/Animation.json')} // Path to your Lottie animation JSON file
        autoPlay
        loop={false} // Set to true if you want the animation to repeat
        onAnimationFinish={() => navigation.replace('Home')} // Navigate after animation
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Adjust the background color
  },
  animation: {
    width: Dimensions.get('window').width * 0.8, // Adjust animation size
    height: Dimensions.get('window').width * 0.8,
  },
});

export default SplashScreenComponent;
