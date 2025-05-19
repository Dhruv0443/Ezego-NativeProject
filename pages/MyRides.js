import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '../firebase';

const MyRides = ({ userData }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ridesRef = ref(db, 'rides');
    const unsubscribe = onValue(ridesRef, (snapshot) => {
      const data = snapshot.val();
      const userRides = [];

      for (let key in data) {
        if (data[key].driverName === userData.name) {
          userRides.push({
            id: key,
            ...data[key],
          });
        }
      }

      setRides(userRides);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userData.name]);

  const handleDelete = (id) => {
    Alert.alert('Delete Ride', 'Are you sure you want to delete this ride?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await remove(ref(db, `rides/${id}`));
            Alert.alert('Deleted', 'Ride has been deleted.');
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to delete ride.');
          }
        },
      },
    ]);
  };

  const renderRide = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.info}>From: {item.leavingFrom}</Text>
      <Text style={styles.info}>To: {item.goingTo}</Text>
      <Text style={styles.info}>Date: {item.date}</Text>
      <Text style={styles.info}>Time: {item.time}</Text>
      <Text style={styles.info}>Seats: {item.passengers}</Text>
      <Text style={styles.info}>Price: ₹{item.price}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete Ride</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Rides</Text>
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading rides...</Text>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          ListEmptyComponent={<Text style={styles.empty}>No rides offered yet.</Text>}
        />
      )}
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
