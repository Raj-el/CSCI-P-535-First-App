import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../config";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

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
      } else {
        navigation.navigate("SignIn");
      }
    });
    return unsubscribe;
  }, []);

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
          <Text style={styles.title}>
            Welcome, {userName} ({userEmail})
          </Text>
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
