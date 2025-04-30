import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Correct import

const Home = ({ navigation }) => {
    const [showAllRides, setShowAllRides] = useState(false);
    const toggleRidesDisplay = () => {
        setShowAllRides(!showAllRides);
    };
    const rides = [
        { id: 1, from: "Elante Mall", to: "Sector 17 Market" },
        { id: 2, from: "ISBT 43", to: "Railway Station" },
        { id: 3, from: "Tribune Chowk", to: "Airport, Mohali" },
        { id: 4, from: "I.S Bindra Stadium", to: "Sukhna Lake" },
        { id: 5, from: "Shastri Market", to: "PU" },
        { id: 6, from: "PEC", to: "Tribune Chowk" },
        { id: 7, from: "ISBT 43", to: "Airport, Mohali" },
        { id: 8, from: "Mansa Devi Temple", to: "Rock Garden" },
        { id: 9, from: "Sukhna Lake", to: "Chhatbir Zoo" },
        { id: 10, from: "Palika Bazaar", to: "Shastri Market" },
        { id: 11, from: "Best Price, Zirakpur", to: "Haldirams, Derabassi" },
        { id: 12, from: "Town Park", to: "Elante Mall" },
    ];
    return (
        <ScrollView style={styles.container}>
            {/* Hero Section */}
            <View style={styles.hero}>
                <Image
                    source={require("../assets/home_img.jpg")}
                    style={styles.heroImage}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <Text style={styles.heroText}>Discover pocket-friendly rides!</Text>
                </View>
            </View>

            {/* Features Section */}
            <View style={styles.features}>
                <View style={styles.feature}>
                    <FontAwesome name="server" size={24} style={styles.featureIcon} />
                    <Text style={styles.featureTitle}>Discover Pocket-Friendly Rides!</Text>
                    <Text style={styles.featureText}>
                        Find the perfect ride that suits your budget. Explore destinations and routes offering affordable travel options by carpool.
                    </Text>
                </View>
                <View style={styles.feature}>
                    <FontAwesome name="users" size={24} style={styles.featureIcon} />
                    <Text style={styles.featureTitle}>Trust who you travel with!</Text>
                    <Text style={styles.featureText}>
                        Safety and peace of mind are our top priorities. Book your ride securely, knowing who you're traveling with.
                    </Text>
                </View>
                <View style={styles.feature}>
                    <FontAwesome name="check-circle" size={24} style={styles.featureIcon} />
                    <Text style={styles.featureTitle}>Booking Made Effortless!</Text>
                    <Text style={styles.featureText}>
                        Booking your next ride is as easy as a few taps. Experience the convenience of booking a ride close to you.
                    </Text>
                </View>
            </View>

            {/* Offer Section */}
            <View style={styles.offerSection}>
                <Image source={require("../assets/img1.png")} style={styles.offerImage} />
                <View style={styles.offerContent}>
                    <Text style={styles.offerTitle}>Driving in your car soon?</Text>
                    <Text style={styles.offerText}>
                        Got a spare seat? Offer it up and be part of our connected community. Share the ride, share the fun!
                    </Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Offer Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* FAQ Section */}
            <View style={styles.faqSection}>
                <Text style={styles.faqTitle}>Need Assistance? We're Here to Help!</Text>
                <Text style={styles.faqText}>
                    Have questions or need support? Our Help Center is here to guide you every step of the way.
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Faq")}>
                    <Text style={styles.buttonText}>Explore our Help Centre</Text>
                </TouchableOpacity>
            </View>

            {/* Popular Rides Section */}
            <View style={styles.popularRides}>
                <Text style={styles.popularTitle}>See our most popular rides!</Text>
                <FlatList
                    data={showAllRides ? rides : rides.slice(0, 3)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.rideItem}>
                            <Text style={styles.rideText}>{item.from}</Text>
                            <Text style={styles.rideSeparator}> - </Text>
                            <Text style={styles.rideText}>{item.to}</Text>
                        </View>
                    )}
                />
                <TouchableOpacity onPress={toggleRidesDisplay}>
                    <Text style={styles.toggleText}>
                        {showAllRides ? "less..." : "more..."}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    homeText: { fontSize: 20, fontWeight: "bold", margin: 16 },
    hero: { position: "relative", height: 200 },
    heroImage: { width: "100%", height: "100%" },
    overlay: { position: "absolute", top: "20%", left: "35%", transform: [{ translateX: -100 }], alignItems: "center" },
    heroText: { fontSize: 24, fontWeight: "bold", color: "#034752" },
    features: { padding: 16, flexDirection: "column", gap: 16 },
    feature: { marginBottom: 16 },
    featureIcon: { color: "#10B981", marginBottom: 8 },
    featureTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
    featureText: { fontSize: 14, color: "#6B7280" },
    offerSection: { flexDirection: "row", backgroundColor: "#10B981", padding: 16, alignItems: "center" },
    offerImage: { width: 100, height: 100, marginRight: 16 },
    offerContent: { flex: 1 },
    offerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 8 },
    offerText: { fontSize: 14, color: "#fff", marginBottom: 8 },
    button: { backgroundColor: "#fff", padding: 12, borderRadius: 8, alignItems: "center" },
    buttonText: { color: "#10B981", fontWeight: "bold" },
    faqSection: { padding: 16 },
    faqTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
    faqText: { fontSize: 14, marginBottom: 8 },
    popularRides: { padding: 16, backgroundColor: "#034752" },
    popularTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 16 },
    rideItem: {
        flexDirection: "row",
        backgroundColor: "#E5E7EB",
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        justifyContent: "space-between",
    },
    rideText: { fontSize: 16, color: "#333" },
    rideSeparator: { fontSize: 16, fontWeight: "bold", color: "#6B7280" },
    toggleText: { color: "#A7F3D0", textAlign: "right", fontWeight: "bold", marginTop: 8 },
});

export default Home;
