import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
} from "react-native";
import { auth } from "../config";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const scaleAnim = useRef(new Animated.Value(1)).current; // For scaling animation
  const pan = useRef(new Animated.ValueXY()).current; // For dragging animation

  // PanResponder to handle drag gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        { dx: pan.x, dy: pan.y }, // Track changes in x and y
      ],
      { useNativeDriver: false } // PanResponder animations are JS-driven
    ),
    onPanResponderRelease: () => {
      // Reset position when dragging ends
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false, // JS-driven
      }).start();
    },
  });

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedName = await AsyncStorage.getItem("userName");
        if (storedEmail) setUserEmail(storedEmail);
        if (storedName) setUserName(storedName);
      } catch (error) {
        console.error("Error fetching data from storage:", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserDataFromStorage();
        startAnimation(); // Start scaling animation when user is authenticated
      } else {
        navigation.navigate("SignIn");
      }
    });
    return unsubscribe;
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5, // Scale up to 1.5x
          duration: 1000,
          useNativeDriver: true, // This animation remains native-driven
          easing: Easing.ease,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Scale back to original size
          duration: 1000,
          useNativeDriver: true, // This animation remains native-driven
          easing: Easing.ease,
        }),
      ])
    ).start();
  };

  const onSignOut = async () => {
    await signOut(auth).then(() => {
      console.log("User signed out!");
      navigation.navigate("SignIn");
    });
  };

  return (
    <View style={styles.container}>
      {userEmail !== "" && (
        <>
          {/* PanResponder for Dragging */}
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              {
                transform: [
                  { translateX: pan.x }, // Move the text horizontally
                  { translateY: pan.y }, // Move the text vertically
                ],
              },
            ]}
          >
            {/* Scaling Animation */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Text style={styles.title}>
                Welcome, {userName} ({userEmail})
              </Text>
            </Animated.View>
          </Animated.View>
          <Button title="Logout" onPress={onSignOut} color="#28a745" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
