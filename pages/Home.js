import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const [showAllRides, setShowAllRides] = useState(false);
  const toggleRidesDisplay = () => setShowAllRides(!showAllRides);

  const navigation = useNavigation();

  function moveToOffer() {
    navigation.navigate("Offer");
  }

  function moveToFAQ() {
    navigation.navigate("Faq");
  }

  const rides = [
    { id: 1, from: "Elante Mall", to: "Sector 17 Market" },
    { id: 2, from: "ISBT 43", to: "Railway Station" },
    { id: 3, from: "Tribune Chowk", to: "Airport, Mohali" },
    { id: 4, from: "I.S Bindra Stadium", to: "Sukhna Lake" },
    { id: 5, from: "Shastri Market", to: "PU" },
    { id: 6, from: "PEC", to: "Tribune Chowk" },
    // { id: 7, from: "ISBT 43", to: "Airport, Mohali" },
    // { id: 8, from: "Mansa Devi Temple", to: "Rock Garden" },
    // { id: 9, from: "Sukhna Lake", to: "Chhatbir Zoo" },
    // { id: 10, from: "Palika Bazaar", to: "Shastri Market" },
    // { id: 11, from: "Best Price, Zirakpur", to: "Haldirams, Derabassi" },
    // { id: 12, from: "Town Park", to: "Elante Mall" }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Image source={require("../assets/home_img.jpg")} style={styles.banner} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerText}>Discover pocket friendly rides!</Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Icon name="server-outline" size={24} color="#0f172a" style={styles.icon} />
          <Text style={styles.featureTitle}>Discover Pocket-Friendly Rides!</Text>
          <Text style={styles.featureText}>
            Whether you're headed near or far, find the perfect ride that suits your budget. Explore an extensive range of destinations and routes.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Icon name="people-outline" size={24} color="#0f172a" style={styles.icon} />
          <Text style={styles.featureTitle}>Trust who you travel with!</Text>
          <Text style={styles.featureText}>
            From reviews to ID checks, book your ride securely on our platform, knowing exactly who you're traveling with.
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Icon name="checkmark-circle-outline" size={24} color="#0f172a" style={styles.icon} />
          <Text style={styles.featureTitle}>Booking Made Effortless!</Text>
          <Text style={styles.featureText}>
            Booking is just a few taps away. Experience convenience like never before.
          </Text>
        </View>
      </View>

      {/* Offer Ride */}
      <View style={styles.section}>
        {/* <Image source={require("../assets/img1.png")} style={styles.sectionImage} /> */}
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>Driving in your car soon?</Text>
          <Text style={styles.sectionDescription}>
            Got a spare seat? Offer it up and be part of our community. List your ride and connect with passengers eager to join.
          </Text>
          <TouchableOpacity style={styles.buttonWhite} onPress={moveToOffer}>
            <Text style={styles.buttonTextGreen}>Offer Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Help Section */}
      <View style={styles.sectionAlt}>
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitleAlt}>Need Assistance? We're Here to Help!</Text>
          <Text style={styles.sectionDescriptionAlt}>
            Our Help Center is here to guide you every step of the way. From booking to troubleshooting, we’ve got you covered.
          </Text>
          <TouchableOpacity style={styles.buttonGreen} onPress={moveToFAQ}>
            <Text style={styles.buttonTextWhite}>Explore our Help Centre</Text>
          </TouchableOpacity>
        </View>
        {/* <Image source={require("../assets/img2.jpg")} style={styles.sectionImage} /> */}
      </View>

      {/* Popular Rides */}
      <View style={styles.popular}>
        <Text style={styles.popularTitle}>See our most popular rides!</Text>
        {rides.slice(0, showAllRides ? rides.length : 3).map((ride) => (
          <TouchableOpacity key={ride.id} style={styles.rideButton}>
            <Text style={styles.rideText}>{ride.from} - {ride.to}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={toggleRidesDisplay}>
          <Text style={styles.toggleText}>{showAllRides ? "less..." : "more..."}</Text>
        </TouchableOpacity>
      </View>

      {/* <Footer /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  banner: { width: "100%", height: 200 },
  bannerOverlay: {
    position: "absolute", top: 80, left: 0, right: 0, alignItems: "center"
  },
  bannerText: {
    fontSize: 24, fontWeight: "bold", color: "#0f172a", backgroundColor: "#ffffffcc", padding: 10
  },
  features: { padding: 16 },
  featureItem: { marginBottom: 24 },
  icon: { marginBottom: 8 },
  featureTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4, color: "#0f172a" },
  featureText: { fontSize: 14, color: "#334155" },

  section: { flexDirection: "row", padding: 16, backgroundColor: "#34d399" },
  sectionAlt: { flexDirection: "row", padding: 16, backgroundColor: "#f1f5f9" },
  sectionImage: { width: 100, height: 100, marginRight: 16, resizeMode: "contain" },
  sectionText: { flex: 1 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 8, alignContent:'center', textAlign:'center' },
  sectionDescription: { fontSize: 14, color: "#fff", marginBottom: 8,marginLeft:'10%', marginRight:'10%' },
  sectionTitleAlt: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginBottom: 8, textAlign:'center' },
  sectionDescriptionAlt: { fontSize: 14, color: "#334155", marginBottom: 8 ,marginLeft:'10%', marginRight:'10%'},

  buttonWhite: {
    backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginLeft:'20%', marginRight:'20%'
  },
  buttonGreen: {
    backgroundColor: "#059669", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 ,marginLeft:'20%', marginRight:'20%'
  },
  buttonTextGreen: { color: "#059669", fontWeight: "bold" },
  buttonTextWhite: { color: "#fff", fontWeight: "bold" },

  popular: { backgroundColor: "#0f172a", padding: 16, marginBottom:5 },
  popularTitle: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  rideButton: {
    backgroundColor: "#e2e8f0", padding: 12, borderRadius: 6, marginBottom: 8
  },
  rideText: { color: "#0f172a", fontWeight: "500" },
  toggleText: { color: "#34d399", textAlign: "right", marginTop: 10 }
});

export default Home;
