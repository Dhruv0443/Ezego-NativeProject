//App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import Home from './pages/Home';
import Search from './pages/Search';
import OfferRide from './pages/OfferRide';
import Account from './pages/Account';
import Faq from './pages/Faq';
import MyRides from './pages/MyRides';
import Profile from './pages/Profile';
import Verification from './pages/Verification';
import LoginPrompt from './components/LoginPrompt';
import Navbar from './components/Navbar';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userData, setUserData] = useState(null);
  const [isDriverVerified, setIsDriverVerified] = useState(false);

  const handleLogin = (user) => {
    // Simulate login with dummy user
    const dummyUser = {
      name: 'Dummy User',
      email: user.email || 'dummy@example.com',
      isDriver: false,
    };
    setUserData(dummyUser);
  };

  const handleProfileVerification = (details) => {
    if (userData) {
      const updatedUserData = {
        ...userData,
        isDriver: true,
        carName: details.carName,
        carNumber: details.carNumber,
        driverPhoto: details.driverPhoto,
      };
      setUserData(updatedUserData);
      setIsDriverVerified(true);
    }
  };

  useEffect(() => {
    if (userData && userData.isDriver) {
      setIsDriverVerified(true);
    }
  }, [userData]);

  const determineOfferElement = () => {
    // if (userData) {
    //   return userData.isDriver ? (
    //     <OfferRide userData={userData} />
    //   ) : (
    //     <Verification onVerify={handleProfileVerification} />
    //   );
    return userData ? <OfferRide userData={userData} />: <LoginPrompt />;
    };

  const determineSearchElement = () => {
    return userData ? <Search /> : <LoginPrompt />;
  };

  const handleLogout = () => {
    setUserData(null);
    setIsDriverVerified(false);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Navbar userData={userData} onLogout={handleLogout} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" children={determineSearchElement} />
          <Stack.Screen name="Offer" children={determineOfferElement} />
          <Stack.Screen name="Account">
            {() => <Account onLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen name="Faq" component={Faq} />
          <Stack.Screen name="MyRides" component={MyRides} />
          <Stack.Screen name="Profile">
            {() => <Profile userData={userData} onLogout={handleLogout} />}
          </Stack.Screen>
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
    marginTop: 30,
  },
});
