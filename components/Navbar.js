import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Navbar = ({ userData }) => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // clear all local storage
      Alert.alert('Success', 'Logged out successfully');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Account' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'An error occurred during logout');
    }
  };

  const name = userData?.name
    ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
    : '';

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.brand}>zego</Text>
      </TouchableOpacity>

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.menuItem}>
          <Icon name="search" size={20} color="#065f46" />
          <Text style={styles.menuText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Offer')} style={styles.menuItem}>
          <Icon name="plus" size={20} color="#065f46" />
          <Text style={styles.menuText}>Offer</Text>
        </TouchableOpacity>

        {userData ? (
          <View>
            <TouchableOpacity onPress={toggleDropdown} style={styles.profileButton}>
              <Icon name="user" size={26} color="#065f46" />
            </TouchableOpacity>

            <Modal transparent={true} visible={dropdownVisible} animationType="fade">
              <Pressable style={styles.modalOverlay} onPress={() => setDropdownVisible(false)}>
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    onPress={() => {
                      setDropdownVisible(false);
                      navigation.navigate('Profile');
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text>{name}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setDropdownVisible(false);
                      navigation.navigate('MyRides');
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text>My Rides</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={async () => {
                      setDropdownVisible(false);
                      await handleLogout();
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={styles.logoutText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.menuItem}>
            <Icon name="user" size={26} color="#065f46" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 40,
    marginRight: 8,
  },
  brand: {
    fontSize: 24,
    color: '#155e75',
    fontWeight: 'bold',
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 5,
    color: '#065f46',
    fontSize: 16,
  },
  profileButton: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  dropdown: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logoutText: {
    color: '#059669',
    fontWeight: 'bold',
  },
});
