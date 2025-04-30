import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = ({ userData, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigation = useNavigation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // React Native doesn't have an event like `mousedown`, adapt logic as necessary
      setIsDropdownOpen(false);
    };

    // You can implement additional effects if needed
    return () => {
      // Cleanup logic here
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}users/logout`, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'POST',
      });

      if (response.ok) {
        Alert.alert('Success', 'Logged out successfully');
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        onLogout();
      } else {
        const data = await response.json();
        Alert.alert('Error', `Logout failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'An error occurred while logging out.');
    }
  };

  if (userData) {
    var username = userData.name;
    var name = username.charAt(0).toUpperCase() + username.slice(1);
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: 'white' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('./assets/logo.png')} style={{ width: 48, height: 48 }} />
        <Text style={{ color: '#00695c', fontSize: 24, fontWeight: 'bold', marginLeft: 8 }}>coRide</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
          <FontAwesomeIcon name="search" size={24} color="#00695c" />
          <Text style={{ marginLeft: 8, color: '#00695c', fontSize: 18 }}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Offer')} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
          <FontAwesomeIcon name="plus" size={24} color="#00695c" />
          <Text style={{ marginLeft: 8, color: '#00695c', fontSize: 18 }}>Offer a Ride</Text>
        </TouchableOpacity>

        {userData ? (
          <View style={{ position: 'relative' }}>
            <TouchableOpacity onPress={toggleDropdown} style={{ marginRight: 16 }}>
              <FontAwesomeIcon name="user" size={32} color="#00695c" />
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={{ position: 'absolute', right: 0, marginTop: 8, backgroundColor: 'white', borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 4, elevation: 3 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ padding: 8, alignItems: 'center' }}>
                  <Text>{name}'s Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MyRides')} style={{ padding: 8, alignItems: 'center' }}>
                  <Text>My Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={{ padding: 8, alignItems: 'center' }}>
                  <Text style={{ color: '#00796b', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
            <FontAwesomeIcon name="user" size={32} color="#00695c" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Navbar;
