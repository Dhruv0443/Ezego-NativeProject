
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ref, set, get, child, push } from 'firebase/database';
import { db } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            ? '' : 'Weak password';
          break;
      }
      setErrors(newErrors);
    }
  };

  const handleLogin = async () => {
    try {
      const snapshot = await get(child(ref(db), 'users'));
      if (snapshot.exists()) {
        const users = snapshot.val();
        const matchedEntry = Object.entries(users).find(
          ([, user]) =>
            user.email === formData.email && user.password === formData.password
        );
        if (matchedEntry) {
          const [userId, userData] = matchedEntry;
          await AsyncStorage.setItem('userId', userId); // ✅ Store userId
          onLogin({ ...userData, userId });
          Alert.alert('Login Successful');
          navigation.navigate('Home');
        } else {
          Alert.alert('Login failed', 'Invalid email or password');
        }
      } else {
        Alert.alert('Login failed', 'No users found');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const snapshot = await get(child(ref(db), 'users'));
      const users = snapshot.exists() ? snapshot.val() : {};

      const exists = Object.values(users).some(user => user.email === formData.email);
      if (exists) {
        Alert.alert('Signup failed', 'Email already exists');
        return;
      }

      const newRef = push(ref(db, 'users'));
      const userId = newRef.key;

      const newUser = {
        userId,
        name: formData.name,
        contact: formData.contact,
        email: formData.email,
        password: formData.password,
        isDriver: false,
        driverVerification: null,
        savedRides: [],
      };

      await set(newRef, newUser);
      await AsyncStorage.setItem('userId', userId); // ✅ Store userId
      onLogin(newUser);

      Alert.alert('Signup successful');
      setIsLogin(true);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' }}>
          Share the Ride!{'\n'}Share the Journey!
        </Text>
        <Image source={require('../assets/acc.jpg')} style={{ width: 280, height: 180, marginTop: 20 }} resizeMode="contain" />
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
