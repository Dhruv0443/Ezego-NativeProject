//Account.js
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Account = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const [dummyUsers, setDummyUsers] = useState([
    {
      name: 'Dhruv',
      contact: '8265968128',
      email: 'dhruv123@gmail.com',
      password: 'Dhruv@1234',
      isDriver: true,
      driverVerification: {
        carName: 'Honda City',
        carNumber: 'HR26DK1234',
        livePhoto: 'dummy_photo_1.jpg',
      },
      savedRides: [],
    },
    {
      name: 'Rithika',
      contact: '9012345678',
      email: 'rithika123@gmail.com',
      password: 'Rithika@1234',
      isDriver: false,
      driverVerification: null,
      savedRides: [],
    },
    {
      name: 'Jasjot',
      contact: '9123456780',
      email: 'jasjot123@gmail.com',
      password: 'Jasjot@123',
      isDriver: true,
      driverVerification: {
        carName: 'Swift Dzire',
        carNumber: 'DL8CAF7890',
        livePhoto: 'dummy_photo_2.jpg',
      },
      savedRides: [],
    },
  ]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    if (!isLogin) {
      const newErrors = { ...errors };

      switch (name) {
        case 'email':
          newErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email';
          break;
        case 'contact':
          newErrors.contact = /^[9876][0-9]{9}$/.test(value) ? '' : 'Invalid contact';
          break;
        case 'password':
          newErrors.password = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value)
            ? ''
            : 'Weak password';
          break;
      }

      setErrors(newErrors);
    }
  };

  const handleLogin = () => {
    const matchedUser = dummyUsers.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (matchedUser) {
      const userData = {
        email: matchedUser.email,
        name: matchedUser.name,
        contact: matchedUser.contact,
        isDriver: matchedUser.isDriver,
        carName: matchedUser.driverVerification?.carName,
        carNumber: matchedUser.driverVerification?.carNumber,
        livePhoto: matchedUser.driverVerification?.livePhoto,
        savedRides: matchedUser.savedRides,
      };
      onLogin(userData);
      Alert.alert('Login Successful');
      navigation.navigate('Home')
    } else {
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  const handleSignup = () => {
    const exists = dummyUsers.some(user => user.email === formData.email);
    if (exists) {
      Alert.alert('Signup failed', 'Email already exists');
      return;
    }

    const newUser = {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      password: formData.password,
      isDriver: false,
      driverVerification: null,
      savedRides: [],
    };

    setDummyUsers(prev => [...prev, newUser]);
    Alert.alert('Signup successful');
    setIsLogin(true); // Go to login screen after signup
    navigation.navigate("Home")
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' }}>
          Share the Ride!{'\n'}Share the Journey!
        </Text>
        <Image
          source={require('../assets/acc.jpg')}
          style={{ width: 280, height: 180, marginTop: 20 }}
          resizeMode="contain"
        />
      </View>

      {!isLogin && (
        <TextInput
          placeholder="Name"
          value={formData.name}
          onChangeText={text => handleChange('name', text)}
          style={styles.input}
        />
      )}

      {!isLogin && (
        <>
          <TextInput
            placeholder="Contact"
            value={formData.contact}
            keyboardType="phone-pad"
            onChangeText={text => handleChange('contact', text)}
            style={styles.input}
          />
          {errors.contact ? <Text style={styles.error}>{errors.contact}</Text> : null}
        </>
      )}

      <TextInput
        placeholder="Email"
        value={formData.email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={text => handleChange('email', text)}
        style={styles.input}
      />
      {!isLogin && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginLeft: 10 }}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      {!isLogin && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

      <TouchableOpacity
        onPress={isLogin ? handleLogin : handleSignup}
        style={[styles.button, { backgroundColor: isLogin ? '#2563eb' : '#059669' }]}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
        <Text style={{ color: '#2563eb', textAlign: 'center' }}>
          {isLogin ? "Don't have an account? Sign up now!" : 'Already have an account? Log in!'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
};

export default Account;
