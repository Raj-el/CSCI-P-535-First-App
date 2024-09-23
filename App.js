import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUp";
import SignInScreen from "./screens/SignIn";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// Create Tab and Stack Navigators
const Stack = createStackNavigator();
const firebaseConfig = {
  apiKey: "AIzaSyBisKE9oJxmbWoE6qECpEZskCpmKoQ8C7A",
  authDomain: "my-app-3ba50.firebaseapp.com",
  projectId: "my-app-3ba50",
  storageBucket: "my-app-3ba50.appspot.com",
  messagingSenderId: "392800303698",
  appId: "1:392800303698:web:38b53979ac2566eb693d8b",
  measurementId: "G-PEX4GDQNPY",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const App = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is logged in, navigate to Home screen
        navigation.navigate("Home");
      } else {
        // If user is not logged in, navigate to SignIn screen
        navigation.navigate("SignIn");
      }
    });

    return unsubscribe; // Unsubscribe when component unmounts
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
