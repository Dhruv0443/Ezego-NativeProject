import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import IconPhone from 'react-native-vector-icons/FontAwesome';
import IconDot from 'react-native-vector-icons/Octicons';
import IconCar from 'react-native-vector-icons/FontAwesome5';
import { useRides } from '../context/RidesContext';

const RideDetails = ({ ride }) => {
  const { bookRide } = useRides();

  const handleBookRide = () => {
    Alert.alert('Success', 'Your ride has been booked successfully!');
    bookRide(ride);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.time}>{ride.time}</Text>
        <View style={styles.priceInfo}>
          <Text style={styles.price}>Rs. {ride.price}</Text>
          <Text>/seat</Text>
          <Text>{ride.passengers} seats available</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <IconDot name="dot-fill" size={20} color="#000" style={styles.dotIcon} />
          <Text>{ride.leavingFrom}</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.locationRow}>
          <IconDot name="dot-fill" size={20} color="#000" style={styles.dotIcon} />
          <Text>{ride.goingTo}</Text>
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.driverInfo}>
          <Image source={{ uri: ride.driverPhoto }} style={styles.driverPhoto} />
          <View style={styles.driverText}>
            <Text>{ride.driverName}</Text>
            <View style={styles.contactRow}>
              <IconPhone name="phone" size={16} style={styles.phoneIcon} />
              <Text>{ride.driverContact}</Text>
            </View>
          </View>
        </View>
        <View style={styles.carInfo}>
          <IconCar name="car-side" size={30} style={styles.carIcon} />
          <View>
            <Text>{ride.driverCarName}</Text>
            <Text>{ride.driverCarNumber}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationContainer: {
    marginVertical: 20,
    alignItems: 'flex-start',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dotIcon: {
    marginRight: 8,
  },
  verticalLine: {
    height: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#666',
    marginLeft: 9,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverPhoto: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  driverText: {
    justifyContent: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  phoneIcon: {
    marginRight: 6,
  },
  carInfo: {
    alignItems: 'center',
  },
  carIcon: {
    marginBottom: 4,
  },
  bookButton: {
    marginTop: 16,
    backgroundColor: '#065f46',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RideDetails;
