import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRides } from '../context/RidesContext'; // Ensure `useRides` is compatible with React Native
import places from '../data/places'; // Import your places data

const SearchBar = ({ searchRides }) => {
  const today = new Date().toISOString().split('T')[0];
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [date, setDate] = useState(today);
  const [passengers, setPassengers] = useState(1);
  const [filteredLeavingFrom, setFilteredLeavingFrom] = useState([]);
  const [filteredGoingTo, setFilteredGoingTo] = useState([]);
  const [showLeavingFromSuggestions, setShowLeavingFromSuggestions] = useState(false);
  const [showGoingToSuggestions, setShowGoingToSuggestions] = useState(false);

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'leavingFrom':
        setLeavingFrom(value);
        setFilteredLeavingFrom(
          places.filter((place) =>
            place.toLowerCase().startsWith(value.toLowerCase())
          )
        );
        setShowLeavingFromSuggestions(true);
        break;
      case 'goingTo':
        setGoingTo(value);
        setFilteredGoingTo(
          places.filter((place) =>
            place.toLowerCase().startsWith(value.toLowerCase())
          )
        );
        setShowGoingToSuggestions(true);
        break;
      case 'date':
        setDate(value);
        break;
      default:
        break;
    }
  };

  const handleIncrementPassenger = () => {
    if (passengers < 4) {
      setPassengers(passengers + 1);
    }
  };

  const handleDecrementPassenger = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const handleSearch = () => {
    if (!leavingFrom || !goingTo) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    if (leavingFrom === goingTo) {
      Alert.alert(
        'Error',
        'Pick-up and Drop destinations cannot be same. Please choose a different destination'
      );
      return;
    }

    const rideDetails = {
      leavingFrom,
      goingTo,
      date,
      passengers,
    };

    searchRides(rideDetails);
    Alert.alert('Success', 'Ride search initiated');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FontAwesomeIcon name="map-marker" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Leaving from"
          value={leavingFrom}
          onChangeText={(text) => handleInputChange('leavingFrom', text)}
        />
      </View>
      {showLeavingFromSuggestions && (
        <FlatList
          data={filteredLeavingFrom}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setLeavingFrom(item);
                setShowLeavingFromSuggestions(false);
              }}
            >
              <Text style={styles.suggestionItem}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <View style={styles.row}>
        <FontAwesomeIcon name="map-marker" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Going to"
          value={goingTo}
          onChangeText={(text) => handleInputChange('goingTo', text)}
        />
      </View>
      {showGoingToSuggestions && (
        <FlatList
          data={filteredGoingTo}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setGoingTo(item);
                setShowGoingToSuggestions(false);
              }}
            >
              <Text style={styles.suggestionItem}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <View style={styles.row}>
        <FontAwesomeIcon name="calendar" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={(text) => handleInputChange('date', text)}
        />
      </View>
      <View style={styles.row}>
        <FontAwesomeIcon name="user" style={styles.icon} />
        <Text>{passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}</Text>
        <TouchableOpacity onPress={handleDecrementPassenger}>
          <FontAwesomeIcon name="minus-circle" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleIncrementPassenger}>
          <FontAwesomeIcon name="plus-circle" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 20, marginRight: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, flex: 1 },
  suggestionItem: { padding: 8, borderBottomWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#00796b', padding: 16, alignItems: 'center', borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default SearchBar;
