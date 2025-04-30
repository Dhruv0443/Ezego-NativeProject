import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const Profile = ({ userData, onLogout }) => {
    const handleLogout = () => {
        Alert.alert("Logged Out", "You have been logged out successfully.");
        onLogout(); // Simply invoke the `onLogout` callback
    };

    return (
        <View style={styles.container}>
            {userData ? (
                <View>
                    <View style={styles.headerSpace} />
                    <View style={styles.profileContainer}>
                        <View style={styles.profileHeader}>
                            <View>
                                <Text style={styles.profileName}>{userData.name}</Text>
                                <Text style={styles.profileStatus}>Newcomer</Text>
                            </View>
                            <FontAwesomeIcon name="user" size={40} color="#6B7280" />
                        </View>
                        <TouchableOpacity style={styles.addPictureButton}>
                            <FontAwesomeIcon name="plus-circle" size={20} color="#10B981" />
                            <Text style={styles.addPictureText}> Add profile picture</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsHeader}>Personal Details</Text>
                        <View style={styles.detail}>
                            <FontAwesomeIcon name="envelope" size={20} color="#6B7280" />
                            <Text style={styles.detailText}>{userData.email}</Text>
                        </View>
                        <View style={styles.detail}>
                            <FontAwesomeIcon name="phone" size={20} color="#6B7280" />
                            <Text style={styles.detailText}>{userData.contact}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.editDetailsText}>Edit personal details</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.noProfileContainer}>
                    <Image source={require("../assets/mr.jpg")} style={styles.noProfileImage} />
                    <Text style={styles.noProfileText}>Login to view your Profile!</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerSpace: {
        height: 20,
        backgroundColor: "#fff",
    },
    profileContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    profileHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profileName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#374151",
    },
    profileStatus: {
        fontSize: 16,
        color: "#6B7280",
    },
    addPictureButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },
    addPictureText: {
        fontSize: 16,
        color: "#10B981",
        fontWeight: "bold",
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: "#D1D5DB",
        marginVertical: 16,
    },
    detailsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    detailsHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 8,
    },
    detail: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    detailText: {
        fontSize: 16,
        color: "#374151",
        marginLeft: 8,
    },
    editDetailsText: {
        fontSize: 16,
        color: "#10B981",
        fontWeight: "bold",
        marginTop: 8,
    },
    logoutButton: {
        alignSelf: "center",
        marginTop: 16,
    },
    logoutText: {
        fontSize: 16,
        color: "#10B981",
        fontWeight: "bold",
    },
    noProfileContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noProfileImage: {
        width: 150,
        height: 150,
        marginBottom: 16,
    },
    noProfileText: {
        fontSize: 20,
        color: "#374151",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Profile;
