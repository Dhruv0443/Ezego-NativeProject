//offerRide.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import places from '../data/places';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_BASE_URL from '../ApiBaseURL';

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
        setFilteredLeavingFrom(places.filter((place) =>
          place.toLowerCase().startsWith(value.toLowerCase())
        ));
        break;
      case 'goingTo':
        setGoingTo(value);
        setFilteredGoingTo(places.filter((place) =>
          place.toLowerCase().startsWith(value.toLowerCase())
        ));
        break;
      case 'date':
        setDate(value);
        if (value === today) setTime(currentTime);
        else setTime('00:00');
        break;
      case 'time':
        if (date === today && value <currentTime) {
          Alert.alert('Invalid Time', 'Time must be in the future');
        } else setTime(value);
        break;
      case 'price':
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

    const token = await AsyncStorage.getItem('accessToken');
    const rideDetails = {
      driverCarName: userData.carName,
      driverCarNumber: userData.carNumber,
      leavingFrom,
      goingTo,
      date,
      time,
      NumberOfpassengers: passengers,
      price,
    };

    try {
      const response = await axios.post(
        'https://ezegobackend.netlify.app/rides/publishRide',
        rideDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.statusCode === 201) {
        Alert.alert('Success', 'Ride created successfully!');
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to publish ride');
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

