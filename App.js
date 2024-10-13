import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUp";
import SignInScreen from "./screens/SignIn";
import ImagePickerScreen from "./screens/ImagePickerScreen";
import LocationScreen from "./screens/LocationScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
        {/* Authentication Screens */}
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Main App Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImagePicker" component={ImagePickerScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
