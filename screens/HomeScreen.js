import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-width)).current;

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? -width : 0;
    Animated.timing(drawerAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsDrawerOpen(!isDrawerOpen));
  };

  const navigateTo = (screen) => {
    console.log(`Navigating to ${screen}`); // Debugging log to confirm touch event
    toggleDrawer(); // Close the drawer
    navigation.navigate(screen); // Navigate to the selected screen
  };

  const onSignOut = async () => {
    await signOut(auth);
    await AsyncStorage.removeItem("userEmail");
    navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
  };

  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
        <Text style={styles.menuText}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome to Home Screen!</Text>

      {/* Logout Button */}
      <Button title="Logout" onPress={onSignOut} color="#28a745" />

      {/* Drawer */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
        pointerEvents={isDrawerOpen ? "auto" : "none"} // Enable touch only when open
      >
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateTo("Home")}
        >
          <Text style={styles.drawerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateTo("ImagePicker")}
        >
          <Text style={styles.drawerText}>Image Picker</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateTo("Location")}
        >
          <Text style={styles.drawerText}>Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={onSignOut}>
          <Text style={styles.drawerText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 50,
  },
  menuText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.75,
    height: "100%",
    backgroundColor: "#333",
    padding: 20,
    justifyContent: "center",
  },
  drawerItem: {
    paddingVertical: 20,
    marginBottom: 20,
  },
  drawerText: {
    color: "#fff",
    fontSize: 18,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
