import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.signInButton]} // Using two styles for SignIn button
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',  // Background color for the whole screen
  },
  button: {
    backgroundColor: '#28a745',   // Green color for the Sign Up button
    paddingVertical: 15,          // Padding inside the button (vertical)
    paddingHorizontal: 40,        // Padding inside the button (horizontal)
    borderRadius: 30,             // Rounded corners for the button
    borderWidth: 2,               // Border width
    borderColor: '#fff',          // White border color
    marginVertical: 10,           // Space between the buttons
    width: 200,                   // Fixed width for the buttons
    alignItems: 'center',         // Center the text inside the button
  },
  signInButton: {
    backgroundColor: '#007bff',   // Blue color for the Sign In button
  },
  buttonText: {
    color: '#fff',                // White text color
    fontSize: 18,                 // Font size for the text
    fontWeight: 'bold',           // Bold font weight
  },
});
