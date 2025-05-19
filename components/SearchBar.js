
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import IconLocation from 'react-native-vector-icons/Ionicons';
import IconCalendar from 'react-native-vector-icons/Ionicons';
import IconPerson from 'react-native-vector-icons/Ionicons';
import IconPlus from 'react-native-vector-icons/Entypo';
import IconMinus from 'react-native-vector-icons/Entypo';
import { ref, get } from 'firebase/database';
import { db } from '../firebase'; // Make sure this path is correct
import places from '../data/places';

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
    if (field === 'leavingFrom') {
      setLeavingFrom(value);
      setFilteredLeavingFrom(places.filter(p => p.toLowerCase().startsWith(value.toLowerCase())));
      setShowLeavingFromSuggestions(true);
    } else if (field === 'goingTo') {
      setGoingTo(value);
      setFilteredGoingTo(places.filter(p => p.toLowerCase().startsWith(value.toLowerCase())));
      setShowGoingToSuggestions(true);
    } else if (field === 'date') {
      setDate(value);
    }
  };

  const handleSearch = async () => {
    if (!leavingFrom || !goingTo) {
      Alert.alert('Validation Error', 'Please fill all the fields');
      return;
    }
    if (leavingFrom === goingTo) {
      Alert.alert('Validation Error', 'Pick-up and Drop destinations cannot be same.');
      return;
    }

    try {
      const ridesRef = ref(db, 'rides');
      const snapshot = await get(ridesRef);
      const data = snapshot.val();

      const filteredRides = [];

      if (data) {
        Object.entries(data).forEach(([id, ride]) => {
          if (
            ride.leavingFrom.toLowerCase() === leavingFrom.toLowerCase() &&
            ride.goingTo.toLowerCase() === goingTo.toLowerCase() &&
            ride.date === date &&
            ride.passengers >= passengers
          ) {
            filteredRides.push({ id, ...ride });
          }
        });
      }

      searchRides(filteredRides);
      Keyboard.dismiss();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch rides');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Leaving From */}
        <View style={styles.inputGroup}>
          <IconLocation name="location-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Leaving from"
            value={leavingFrom}
            onChangeText={(text) => handleInputChange('leavingFrom', text)}
            style={styles.input}
          />
        </View>
        {showLeavingFromSuggestions && (
          <FlatList
            data={filteredLeavingFrom}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestionBox}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setLeavingFrom(item);
                  setShowLeavingFromSuggestions(false);
                }}
                style={styles.suggestionItem}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Going To */}
        <View style={styles.inputGroup}>
          <IconLocation name="location-outline" size={20} style={styles.icon} />
          <TextInput
            placeholder="Going to"
            value={goingTo}
            onChangeText={(text) => handleInputChange('goingTo', text)}
            style={styles.input}
          />
        </View>
        {showGoingToSuggestions && (
          <FlatList
            data={filteredGoingTo}
            keyExtractor={(item, index) => index.toString()}
            style={styles.suggestionBox}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setGoingTo(item);
                  setShowGoingToSuggestions(false);
                }}
                style={styles.suggestionItem}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {/* Date */}
        <View style={styles.inputGroup}>
          <IconCalendar name="calendar-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={(text) => handleInputChange('date', text)}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />
        </View>

        {/* Passenger Count */}
        <View style={styles.passengerRow}>
          <IconPerson name="person-outline" size={20} />
          <Text style={styles.passengerText}>
            {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
          </Text>
          <TouchableOpacity onPress={() => setPassengers(Math.max(1, passengers - 1))}>
            <IconMinus name="circle-with-minus" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPassengers(Math.min(4, passengers + 1))}>
            <IconPlus name="circle-with-plus" size={24} />
          </TouchableOpacity>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
  },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginTop: 10,
  },
  passengerText: {
    fontSize: 16,
  },
  searchBtn: {
    marginTop: 16,
    backgroundColor: '#047857',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  suggestionBox: {
    maxHeight: 120,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
});
