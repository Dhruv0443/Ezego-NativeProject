import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRides } from '../context/RidesContext';

const RideDetails = ({ ride }) => {
    const { bookRide } = useRides();
    const navigation = useNavigation();

    function handleBookRide() {
        Alert.alert('Success', 'Your ride has been booked successfully!');
        bookRide(ride);
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.boldText}>{ride.time}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.boldText}>Rs. {ride.price}</Text>
                        <Text>/seat</Text>
                    </View>
                </View>
                <Text style={styles.seats}>{ride.passengers} seats available</Text>
                <View style={styles.locations}>
                    <FontAwesomeIcon name="dot-circle-o" style={styles.icon} />
                    <Text style={styles.text}>{ride.leavingFrom}</Text>
                </View>
                <View style={styles.locations}>
                    <FontAwesomeIcon name="dot-circle-o" style={styles.icon} />
                    <Text style={styles.text}>{ride.goingTo}</Text>
                </View>
                <View style={styles.row}>
                    <Image source={{ uri: ride.driverPhoto }} style={styles.driverPhoto} />
                    <View>
                        <Text style={styles.text}>{ride.driverName}</Text>
                        <View style={styles.contactRow}>
                            <FontAwesomeIcon name="phone" style={styles.icon} />
                            <Text>{ride.driverContact}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.carDetails}>
                    <FontAwesomeIcon name="car" size={32} style={styles.icon} />
                    <View>
                        <Text>{ride.driverCarName}</Text>
                        <Text>{ride.driverCarNumber}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleBookRide}>
                    <Text style={styles.buttonText}>Book</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    card: { backgroundColor: 'white', padding: 16, borderRadius: 8, elevation: 5 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    boldText: { fontSize: 16, fontWeight: 'bold' },
    priceContainer: { flexDirection: 'row' },
    seats: { fontSize: 16, marginBottom: 8 },
    locations: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    text: { fontSize: 16 },
    icon: { fontSize: 20, marginRight: 8 },
    driverPhoto: { width: 80, height: 80, borderRadius: 40, marginRight: 8 },
    contactRow: { flexDirection: 'row', alignItems: 'center' },
    carDetails: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    button: { backgroundColor: '#00796b', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold' }
});

export default RideDetails;
