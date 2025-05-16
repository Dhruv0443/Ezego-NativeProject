//Profile.js

import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import IconUser from 'react-native-vector-icons/SimpleLineIcons';
import IconAdd from 'react-native-vector-icons/AntDesign';
import IconEmail from 'react-native-vector-icons/MaterialIcons';
import IconPhone from 'react-native-vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_BASE_URL from '../ApiBaseURL';

const Profile = ({ userData, onLogout }) => {
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      const response = await axios.post(
        `${API_BASE_URL}users/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.statusCode === 200) {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        Alert.alert('Success', 'Logout successful');
        onLogout();
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!userData) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.loginPrompt}>Login to view your Profile!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Spacer */}
      <View style={{ height: 80 }} />

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <View>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.subText}>Newcomer</Text>
          </View>
          <IconUser name="user" size={50} color="#334155" />
        </View>

        <TouchableOpacity style={styles.addPicRow}>
          <IconAdd name="pluscircleo" size={22} color="#10b981" />
          <Text style={styles.addPicText}> Add profile picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Personal Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.detailRow}>
          <IconEmail name="email" size={20} color="#334155" />
          <Text style={styles.detailText}> {userData.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <IconPhone name="phone" size={20} color="#334155" />
          <Text style={styles.detailText}> {userData.contact}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editLink}>Edit personal details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.logoutBtn}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
  },
  profileContainer: {
    marginTop: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#334155',
  },
  subText: {
    fontWeight: 'bold',
    color: '#64748b',
  },
  addPicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  addPicText: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  divider: {
    marginVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 10,
  },
  editLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    marginTop: 10,
  },
  logoutBtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
  },
});

