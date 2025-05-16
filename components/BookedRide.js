import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import GoDot from 'react-native-vector-icons/Octicons';

const BookedRide = ({ ride }) => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.rowBetween}>
                    <Text style={styles.boldText}>{ride.time}</Text>
                    <Text style={styles.boldText}>Rs. {ride.price}</Text>
                </View>

                <View style={styles.locationContainer}>
                    <View style={styles.locationRow}>
                        <GoDot name="dot-fill" size={20} style={styles.dot} />
                        <Text>{ride.leavingFrom}</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.locationRow}>
                        <GoDot name="dot-fill" size={20} style={styles.dot} />
                        <Text>{ride.goingTo}</Text>
                    </View>
                </View>

                <View style={styles.rowBetween}>
                    <View style={styles.driverInfo}>
                        <Image source={{ uri: ride.driverPhoto }} style={styles.driverImage} />
                        <View style={styles.driverDetails}>
                            <Text>{ride.driverName}</Text>
                            <View style={styles.contactRow}>
                                <Icon name="phone" size={16} style={styles.phoneIcon} />
                                <Text>{ride.driverContact}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.carInfo}>
                        <Icon name="car-rear" size={36} style={styles.carIcon} />
                        <View>
                            <Text>{ride.driverCarName}</Text>
                            <Text>{ride.driverCarNumber}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 14,
        borderRadius: 16,
        elevation: 4,
        marginHorizontal: '5%',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boldText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationContainer: {
        paddingVertical: 16,
        alignItems: 'flex-start',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        marginRight: 8,
        color: '#000',
    },
    verticalLine: {
        height: 24,
        borderLeftWidth: 2,
        borderColor: '#666',
        marginLeft: 10,
        marginVertical: 4,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    driverImage: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    driverDetails: {
        marginLeft: 12,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    phoneIcon: {
        marginRight: 6,
        color: '#333',
    },
    carInfo: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    carIcon: {
        marginBottom: 4,
        color: '#333',
    },
});

export default BookedRide;
