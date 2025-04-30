import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../ApiBaseURL";
import SearchBar from "../components/SearchBar"; // Ensure this component is adapted for React Native
import RideDetails from "../components/RideDetails"; // Ensure this component is adapted for React Native

const Search = () => {
    const [rides, setRides] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    const [originalRides, setOriginalRides] = useState([]);

    const searchRides = async (rideDetails) => {
        setSearchPerformed(true);

        try {
            const token = await AsyncStorage.getItem("accessToken");
            const response = await fetch(`${API_BASE_URL}rides/searchRides`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(rideDetails),
                credentials: "include",
            });
            const data = await response.json();

            if (response.ok) {
                setRides(data.data);
                setOriginalRides([...data.data]);
            } else {
                Alert.alert("Error", `Failed to fetch rides: ${data.message}`);
            }
        } catch (error) {
            console.error("Error fetching rides:", error);
            Alert.alert("Error", "An error occurred while fetching rides.");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    };

    const sortRides = (criteria) => {
        let sortedRides = [...rides];
        switch (criteria) {
            case "earliest":
                sortedRides.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
                break;
            case "priceLowHigh":
                sortedRides.sort((a, b) => a.price - b.price);
                break;
            case "priceHighLow":
                sortedRides.sort((a, b) => b.price - a.price);
                break;
            case "moreSeats":
                sortedRides.sort((a, b) => b.passengers - a.passengers);
                break;
            default:
                break;
        }
        setRides(sortedRides);
    };

    useEffect(() => {
        if (sortCriteria) {
            sortRides(sortCriteria);
        }
    }, [sortCriteria]);

    const clearAllSorts = () => {
        setRides([...originalRides]);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Find a Ride</Text>
            <SearchBar searchRides={searchRides} />
            {searchPerformed ? (
                <View style={styles.resultsContainer}>
                    <View style={styles.sortContainer}>
                        {rides.length > 0 && (
                            <>
                                <View style={styles.sortHeader}>
                                    <Text style={styles.sortTitle}>Sort by:</Text>
                                    <TouchableOpacity onPress={clearAllSorts}>
                                        <Text style={styles.clearText}>Clear all</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.sortOptions}>
                                    <TouchableOpacity onPress={() => setSortCriteria("earliest")} style={styles.sortOption}>
                                        <Text style={styles.sortText}>Earliest Departure</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setSortCriteria("priceLowHigh")} style={styles.sortOption}>
                                        <Text style={styles.sortText}>Price: Low to High</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setSortCriteria("priceHighLow")} style={styles.sortOption}>
                                        <Text style={styles.sortText}>Price: High to Low</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setSortCriteria("moreSeats")} style={styles.sortOption}>
                                        <Text style={styles.sortText}>More Seats Available</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                    <View style={styles.rideList}>
                        {rides.length === 0 ? (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>No rides found! Search for a different ride!</Text>
                                <Image
                                    source={require("../assets/img4.png")} // Ensure the image path is correct
                                    style={styles.emptyImage}
                                />
                            </View>
                        ) : (
                            <>
                                <Text style={styles.date}>{formatDate(rides[0].date)}</Text>
                                <Text style={styles.availableText}>
                                    {rides.length} {rides.length === 1 ? "ride available" : "rides available"}
                                </Text>
                                <FlatList
                                    data={rides}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => <RideDetails ride={item} />}
                                />
                            </>
                        )}
                    </View>
                </View>
            ) : null}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#374151",
        marginBottom: 20,
    },
    resultsContainer: {
        flexDirection: "column",
    },
    sortContainer: {
        padding: 16,
        backgroundColor: "#F3F4F6",
    },
    sortHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sortTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#374151",
    },
    clearText: {
        color: "#10B981",
        fontWeight: "bold",
    },
    sortOptions: {
        flexDirection: "column",
    },
    sortOption: {
        paddingVertical: 8,
    },
    sortText: {
        fontSize: 16,
        color: "#374151",
    },
    rideList: {
        padding: 16,
    },
    date: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#374151",
    },
    availableText: {
        fontSize: 16,
        color: "#6B7280",
    },
    emptyState: {
        alignItems: "center",
        marginTop: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "#374151",
        textAlign: "center",
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
});

export default Search;
