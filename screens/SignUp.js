import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firestore from "firebase/firestore"; // Firestore import
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage for persistence

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State for DropDownPicker
  const [country, setCountry] = useState(null);
  const [openCountry, setOpenCountry] = useState(false); // Add this line
  const [gender, setGender] = useState(null);
  const [openGender, setOpenGender] = useState(false); // Add this line

  const [bio, setBio] = useState("");

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "India", value: "in" },
    { label: "United Kingdom", value: "uk" },
  ];

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const validateForm = () => {
    if (!email || !password || !name || !country || !gender || !bio) {
      Alert.alert("Error", "Please fill in all fields.");
      return false;
    }
    return true;
  };

  const saveUserToFirestore = async (userId) => {
    try {
      await firestore().collection("users").doc(userId).set({
        name: name,
        email: email,
        birthdate: birthdate.toDateString(),
        country: country,
        gender: gender,
        bio: bio,
      });
      console.log("User data saved to Firestore.");
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };

  const saveUserToAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userName", name);
      console.log("User data saved to AsyncStorage.");
    } catch (error) {
      console.error("Error saving data locally:", error);
    }
  };

  const onSignUp = async () => {
    if (!validateForm()) return;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userId = userCredential.user.uid;

        // Save user data to Firestore
        await saveUserToFirestore(userId);

        // Save email and name locally using AsyncStorage
        await saveUserToAsyncStorage();

        // Redirect to Home Screen
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <View>
        <Button
          title="Select Birthdate"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={birthdate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setBirthdate(date);
            }}
          />
        )}
        <Text>Selected Date: {birthdate.toDateString()}</Text>
      </View>

      <DropDownPicker
        open={openCountry}
        value={country}
        items={countryOptions}
        setOpen={setOpenCountry} // Open or close the dropdown
        setValue={setCountry} // Set the selected country
        placeholder="Select Country"
        containerStyle={styles.dropdown}
      />

      <DropDownPicker
        open={openGender}
        value={gender}
        items={genderOptions}
        setOpen={setOpenGender} // Open or close the dropdown
        setValue={setGender} // Set the selected gender
        placeholder="Select Gender"
        containerStyle={styles.dropdown}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Biography"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
      />

      <Button title="Sign Up" onPress={onSignUp} color="#28a745" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
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
  dropdown: {
    marginBottom: 20,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
