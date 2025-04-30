import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Replacement for `react-icons/ti`

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* Top Carpool Routes Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Top Carpool Routes</Text>
          <Text style={styles.text}>Elante Mall - Sector 17 Market</Text>
          <Text style={styles.text}>ISBT 43 - Railway Station</Text>
          <Text style={styles.text}>Tribune Chowk - Airport, Mohali</Text>
          <Text style={styles.text}>I.S Bindra Stadium - Sukhna Lake</Text>
        </View>
        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.title}>About</Text>
          <Text style={styles.text}>How it works</Text>
          <Text style={styles.text}>About us</Text>
          <Text style={styles.text}>Help Centre</Text>
          <Text style={styles.text}>Account</Text>
        </View>
        {/* Follow Us Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Follow Us</Text>
          <View style={styles.iconRow}>
            <FontAwesome name="facebook" size={30} style={styles.icon} />
            <FontAwesome name="instagram" size={30} style={styles.icon} />
            <FontAwesome name="twitter" size={30} style={styles.icon} />
            <FontAwesome name="youtube" size={30} style={styles.icon} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#e2e2e2",
    paddingVertical: 20,
    marginTop: 40,
  },
  container: {
    width: "90%",
    alignSelf: "center",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: "#000",
  },
});

export default Footer;
