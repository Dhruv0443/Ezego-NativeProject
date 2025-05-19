
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import places from '../data/places';
import { db } from '../firebase';
import { ref, push, get } from 'firebase/database';

const OfferRide = ({ userData }) => {
  const today = new Date().toISOString().split('T')[0];
  const [currentTime, setCurrentTime] = useState('');
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [price, setPrice] = useState('');
  const [filteredLeavingFrom, setFilteredLeavingFrom] = useState([]);
  const [filteredGoingTo, setFilteredGoingTo] = useState([]);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const current = `${hours}:${minutes}`;
    setCurrentTime(current);
    setTime(current);
  }, []);

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'leavingFrom':
        setLeavingFrom(value);
        setFilteredLeavingFrom(
          places.filter((place) =>
            place.toLowerCase().startsWith(value.toLowerCase())
          )
        );
        break;
      case 'goingTo':
        setGoingTo(value);
        setFilteredGoingTo(
          places.filter((place) =>
            place.toLowerCase().startsWith(value.toLowerCase())
          )
        );
        break;
      case 'date':
        setDate(value);
        if (value === today) setTime(currentTime);
        else setTime('00:00');
        break;
      case 'time':
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!regex.test(value)) {
          Alert.alert('Invalid Format', 'Time must be in HH:MM (24hr) format.');
          return;
        }
        if (date === today && value < currentTime) {
          Alert.alert('Invalid Time', 'Time must be in the future');
        } else {
          setTime(value);
        }
        break;
      case 'price':
        if (!/^\d+$/.test(value)) {
          Alert.alert('Invalid Input', 'Price must be a number.');
          return;
        }
        setPrice(value);
        break;
    }
  };

  const handlePassengerChange = (type) => {
    if (type === 'inc' && passengers < 4) setPassengers(passengers + 1);
    if (type === 'dec' && passengers > 1) setPassengers(passengers - 1);
  };

  const publishRide = async () => {
    if (!leavingFrom || !goingTo || !price) {
      Alert.alert('Missing Fields', 'Please fill all the fields.');
      return;
    }
  
    if (leavingFrom === goingTo) {
      Alert.alert(
        'Invalid Destination',
        'Pick-up and Drop destinations cannot be the same.'
      );
      return;
    }
  
    try {
      const usersSnapshot = await get(ref(db, 'users'));
      const usersData = usersSnapshot.val();
  
      let matchedUserId = null;
      let carName = '';
      let carNumber = '';
  
      for (const [key, value] of Object.entries(usersData || {})) {
        if (value.name === userData.name) {
          matchedUserId = key;
          carName = value.driverVerification?.carName || '';
          carNumber = value.driverVerification?.carNumber || '';
          break;
        }
      }
  
      if (!matchedUserId) {
        Alert.alert('Verification Error', 'You are not verified to offer a ride.');
        return;
      }
  
      if (!carName || !carNumber) {
        Alert.alert(
          'Incomplete Profile',
          'Car details are missing. Please complete your verification.'
        );
        return;
      }
  
      const rideDetails = {
        driverId: matchedUserId,
        driverName: userData.name || 'Anonymous',
        driverPhone: userData.contact,
        driverCarName: carName,
        driverCarNumber: carNumber,
        leavingFrom,
        goingTo,
        date,
        time,
        passengers,
        price: parseInt(price),
        createdAt: new Date().toISOString(),
      };
  
      const ridesRef = ref(db, 'rides');
      await push(ridesRef, rideDetails);
  
      Alert.alert('Success', 'Ride created successfully!');
      setLeavingFrom('');
      setGoingTo('');
      setDate(today);
      setTime(currentTime);
      setPassengers(1);
      setPrice('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to publish ride.');
    }
  };
  

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        Offer a Ride
      </Text>

      {/* Leaving From */}
      <TextInput
        placeholder="Leaving From"
        value={leavingFrom}
        onChangeText={(text) => handleInputChange('leavingFrom', text)}
        style={{ borderBottomWidth: 1, paddingVertical: 8 }}
      />
      {filteredLeavingFrom.length > 0 && (
        <FlatList
          data={filteredLeavingFrom}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setLeavingFrom(item)}>
              <Text style={{ padding: 6 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Going To */}
      <TextInput
        placeholder="Going To"
        value={goingTo}
        onChangeText={(text) => handleInputChange('goingTo', text)}
        style={{ borderBottomWidth: 1, paddingVertical: 8, marginTop: 10 }}
      />
      {filteredGoingTo.length > 0 && (
        <FlatList
          data={filteredGoingTo}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setGoingTo(item)}>
              <Text style={{ padding: 6 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Date */}
      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={(text) => handleInputChange('date', text)}
        style={{ borderBottomWidth: 1, paddingVertical: 8, marginTop: 10 }}
      />

      {/* Time */}
      <TextInput
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={(text) => handleInputChange('time', text)}
        style={{ borderBottomWidth: 1, paddingVertical: 8, marginTop: 10 }}
      />

      {/* Passengers */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Text style={{ flex: 1 }}>Passengers: {passengers}</Text>
        <TouchableOpacity onPress={() => handlePassengerChange('dec')}>
          <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>➖</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePassengerChange('inc')}>
          <Text style={{ fontSize: 24, paddingHorizontal: 10 }}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Price */}
      <TextInput
        placeholder="Price (Rs.)"
        value={price.toString()}
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('price', text)}
        style={{ borderBottomWidth: 1, paddingVertical: 8, marginTop: 10 }}
      />

      {/* Submit */}
      <TouchableOpacity
        onPress={publishRide}
        style={{
          backgroundColor: '#10b981',
          padding: 12,
          marginTop: 20,
          borderRadius: 5,
        }}
      >
        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold' }}>
          Publish Ride
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OfferRide;
