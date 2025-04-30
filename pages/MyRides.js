import React, { useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from "react-native";
import { useRides } from "../context/RidesContext";
import BookedRide from "../components/BookedRide"; // Ensure BookedRide is adapted for React Native

const MyRides = () => {
    const { bookedRides } = useRides();

    useEffect(() => {
        // Scroll to the top is not needed in React Native, as it doesn't have window scroll behavior
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.space}></View>

            {bookedRides.length > 0 ? (
                <>
                    <Text style={styles.heading}>Booked Rides</Text>
                    <FlatList
                        data={bookedRides}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <BookedRide ride={item} />}
                        contentContainerStyle={styles.list}
                    />
                </>
            ) : (
                <View style={styles.emptyState}>
                    <Image
                        source={require("../assets/mr.jpg")} // Adjust the path to match your project structure
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.emptyText}>Your future travel plans will appear here!</Text>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        paddingBottom: 20,
    },
    space: {
        height: 10,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: "#374151", // Slate gray color
    },
    list: {
        paddingHorizontal: 16,
    },
    emptyState: {
        alignItems: "center",
        marginTop: 20,
    },
    image: {
        height: 200,
        width: 200,
    },
    emptyText: {
        fontSize: 20,
        color: "#374151",
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
    },
});

export default MyRides;
