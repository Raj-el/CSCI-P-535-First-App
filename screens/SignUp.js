import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getUserDataFromStorage = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        if (storedEmail) {
          setUsername(storedEmail); // Pre-fill the email in the login form
        }
      } catch (error) {
        console.error("Error fetching data from storage:", error);
      }
    };

    getUserDataFromStorage();
  }, []);

  const validateForm = () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in both username and password.");
      return false;
    }
    return true;
  };

  const onSignIn = async () => {
    if (!validateForm()) return;

    await signInWithEmailAndPassword(auth, username, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Save the email locally
        await AsyncStorage.setItem("userEmail", username);

        // Redirect to Home (Drawer Navigator)
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }], // Reset the stack to Home
        });
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Invalid email or password.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={onSignIn} color="#007bff" />
      <Button
        title="Sign Up"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        color="#007bff"
      />
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
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});
