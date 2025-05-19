import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SearchBar from '../components/SearchBar';
import RideDetails from '../components/RideDetails';

function Search() {
  const [rides, setRides] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('');
  const [originalRides, setOriginalRides] = useState([]);

  // Now searchRides just receives the filtered array directly from SearchBar
  const searchRides = (filteredRidesArray) => {
    setSearchPerformed(true);
    setRides(filteredRidesArray);
    setOriginalRides(filteredRidesArray);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  const sortRides = (criteria) => {
    let sortedRides = [...rides];
    switch (criteria) {
      case 'earliest':
        sortedRides.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
        break;
      case 'priceLowHigh':
        sortedRides.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        sortedRides.sort((a, b) => b.price - a.price);
        break;
      case 'moreSeats':
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
    setSortCriteria('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Find a Ride</Text>
      <View style={styles.searchBar}><SearchBar searchRides={searchRides} /></View>
      {searchPerformed && (
        <View style={styles.bodyWrapper}>
          <View style={styles.sortSection}>
            {rides.length > 0 && (
              <View>
                <View style={styles.sortHeader}>
                  <Text style={styles.sortTitle}>Sort by:</Text>
                  <TouchableOpacity onPress={clearAllSorts}>
                    <Text style={styles.clearText}>Clear all</Text>
                  </TouchableOpacity>
                </View>
                {[
                  { label: 'Earliest Departure', value: 'earliest', icon: <Ionicons name="time-outline" size={20} /> },
                  { label: 'Price: Low to High', value: 'priceLowHigh', icon: <MaterialCommunityIcons name="sort-ascending" size={20} /> },
                  { label: 'Price: High to Low', value: 'priceHighLow', icon: <MaterialCommunityIcons name="sort-descending" size={20} /> },
                  { label: 'More Seats Available', value: 'moreSeats', icon: <MaterialIcons name="person-add-alt" size={20} /> },
                ].map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.sortOption}
                    onPress={() => setSortCriteria(option.value)}
                  >
                    {option.icon}
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    <View style={styles.radioOuter}>
                      {sortCriteria === option.value && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={styles.ridesSection}>
            {rides.length === 0 ? (
              <View style={styles.noRidesContainer}>
                <Text style={styles.noRidesText}>No rides found! Search for a different ride!</Text>
                <Image source={require('../assets/img4.png')} style={styles.noRidesImage} />
              </View>
            ) : (
              <View style={styles.ridesList}>
                <Text style={styles.dateLabel}>{formatDate(rides[0].date)}</Text>
                <Text style={styles.availableLabel}>{rides.length} {rides.length === 1 ? 'ride available' : 'rides available'}</Text>
                {rides.map((ride) => (
                  <RideDetails key={ride.id} ride={ride} />
                ))}
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#334155',
    marginVertical: 10,
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  bodyWrapper: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
  },
  sortSection: {
    width: '35%',
    padding: 16,
  },
  sortHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sortTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
  },
  clearText: {
    color: '#059669',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  optionLabel: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
    color: '#334155',
  },
  radioOuter: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  ridesSection: {
    width: '65%',
    padding: 16,
  },
  noRidesContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noRidesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  noRidesImage: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  ridesList: {
    marginTop: 10,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
  },
  availableLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 10,
  },
});

export default Search;
