import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../App";
import { signOut } from "firebase/auth";

export default function HomeScreen({ route, navigation }) {
  const currentUser = auth.currentUser;
  const [userEmail, setUserEmail] = useState(currentUser?.email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email); // Update email when user state changes
      } else {
        navigation.navigate("SignIn"); // Redirect to SignIn if user is not signed in
      }
    });
    return unsubscribe;
  }, []);

  const onSignOut = async () => {
    await signOut(auth).then(() => {
      console.log("User signed out!");
      navigation.navigate("SignIn"); // Redirect to SignIn after sign out
    });
  };

  return (
    <View style={styles.container}>
      {userEmail !== "" && (
        <>
          <Text style={styles.title}>Welcome, {userEmail}</Text>
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
