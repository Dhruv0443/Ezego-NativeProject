import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // React Native's navigation hook
import Navbar from "./Navbar"; // Assume Navbar is already adapted for React Native

const LoginPrompt = () => {
  const navigation = useNavigation();

  const handleProceed = () => {
    navigation.navigate("Account"); // Navigate to the "Account" screen
  };

  return (
    <View style={styles.container}>
      <Navbar /> {/* Display Navbar (if needed, adjust accordingly) */}
      <View style={styles.card}>
        <Text style={styles.title}>Please Login to Continue</Text>
        <Text style={styles.description}>
          Access to this page requires authentication. Please proceed to your account by logging in.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleProceed}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPrompt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", // Matches the light-gray background
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
    alignItems: "center",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#065f77", // Cyan-like text color
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#065f77", // Cyan-like button color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
