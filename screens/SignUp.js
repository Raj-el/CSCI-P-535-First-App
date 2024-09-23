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
import { auth } from "../App";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [country, setCountry] = useState(null);
  const [gender, setGender] = useState(null);
  const [bio, setBio] = useState("");

  const [openCountry, setOpenCountry] = useState(false);
  const [openGender, setOpenGender] = useState(false);

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

  const onSignUp = async () => {
    if (!validateForm()) return;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User account created & signed in!");
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
        setOpen={setOpenCountry}
        setValue={setCountry}
        placeholder="Select Country"
        containerStyle={styles.dropdown}
      />

      <DropDownPicker
        open={openGender}
        value={gender}
        items={genderOptions}
        setOpen={setOpenGender}
        setValue={setGender}
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
