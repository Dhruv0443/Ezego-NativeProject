//mYRides.js

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MyRides = () => {
  const [rides, setRides] = useState([
    {
      id: '1',
      from: 'Ambala',
      to: 'Delhi',
      date: '2025-05-20',
      seats: 3,
      price: 250,
    },
    {
      id: '2',
      from: 'Chandigarh',
      to: 'Saharanpur',
      date: '2025-05-22',
      seats: 2,
      price: 300,
    },
  ]);

  const handleDelete = (id) => {
    Alert.alert('Delete Ride', 'Are you sure you want to delete this ride?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          setRides((prev) => prev.filter((ride) => ride.id !== id));
        },
        style: 'destructive',
      },
    ]);
  };

  const renderRide = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.info}>From: {item.from}</Text>
      <Text style={styles.info}>To: {item.to}</Text>
      <Text style={styles.info}>Date: {item.date}</Text>
      <Text style={styles.info}>Seats: {item.seats}</Text>
      <Text style={styles.info}>Price: ₹{item.price}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete Ride</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Rides</Text>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={renderRide}
        ListEmptyComponent={<Text style={styles.empty}>No rides offered yet.</Text>}
      />
    </View>
  );
};

export default MyRides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
});

