
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, update ,get} from 'firebase/database';
import { storage, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Verification = ({ userData, onVerify }) => {
  const [formData, setFormData] = useState({
    aadharCard: null,
    carName: '',
    carNumber: '',
    livePhoto: null,
  });
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const validateCarNumber = (carNumber) => {
    const re = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
    return re.test(String(carNumber));
  };

  const handleCarNumberChange = (text) => {
    setFormData({ ...formData, carNumber: text });
    setErrors({
      ...errors,
      carNumber: validateCarNumber(text) ? '' : 'Format: XX 00 XX 0000',
    });
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Storage Permission',
          message: 'App needs access to your photos',
          buttonPositive: 'OK',
        });

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleImagePick = async (field, useCamera = false) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Enable gallery permission from settings.');
      return;
    }

    const picker = useCamera ? launchCamera : launchImageLibrary;

    picker({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (response.didCancel || response.errorCode || !response.assets?.length) return;
      const image = response.assets[0];
      const file = {
        uri: image.uri,
        name: image.fileName || `${field}.jpg`,
        type: image.type || 'image/jpeg',
      };
      setFormData((prev) => ({ ...prev, [field]: file }));
      if (field === 'livePhoto') setPhotoUri(image.uri);
    });
  };

  const uploadToFirebase = async (file, storagePath) => {
    try {
      if (!file || !file.uri) return null;

      const response = await fetch(file.uri);
      if (!response.ok) {
        console.warn('Failed to fetch file:', file.uri);
        return null;
      }

      const blob = await response.blob();
      const fileRef = storageRef(storage, storagePath);
      await uploadBytes(fileRef, blob);
      return await getDownloadURL(fileRef);
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    }
  };

  const handleVerification = async () => {
    const userName = userData?.name;
  
    if (!userName) {
      Alert.alert('User Error', 'User name not found.');
      return;
    }
  
    const { carName, carNumber, aadharCard, livePhoto } = formData;
  
    if (!carName || !carNumber) {
      Alert.alert('Missing Fields', 'Please enter car name and number.');
      return;
    }
  
    if (!validateCarNumber(carNumber)) {
      Alert.alert('Invalid Car Number', 'Please enter a valid car number format.');
      return;
    }
  
    setUploading(true);
    try {
      // 🔍 Step 1: Find userId by name
      const usersnapshot = await get(dbRef(db, 'users'));
      const data = await usersnapshot.val();
  
      let matchedUserId = null;
      for (const [key, value] of Object.entries(data || {})) {
        if (value.name === userName) {
          matchedUserId = key;
          break;
        }
      }
  
      if (!matchedUserId) {
        Alert.alert('User Not Found', 'No user with this name found in database.');
        setUploading(false);
        return;
      }
  
      // 🔄 Step 2: Upload files
      const livePhotoPath = `verifications/${matchedUserId}/image.jpg`;
      const aadharPath = `verifications/${matchedUserId}/aadhar.jpg`;
  
      let livePhotoUrl = '';
      let aadharUrl = '';
  
      if (livePhoto?.uri) {
        const uploadedLive = await uploadToFirebase(livePhoto, livePhotoPath);
        if (uploadedLive) livePhotoUrl = uploadedLive;
      }
  
      if (aadharCard?.uri) {
        const uploadedAadhar = await uploadToFirebase(aadharCard, aadharPath);
        if (uploadedAadhar) aadharUrl = uploadedAadhar;
      }
  
      // 📝 Step 3: Update database
      await update(dbRef(db, `users/${matchedUserId}`), {
        isDriver: true,
        driverVerification: {
          carName,
          carNumber,
          livePhotoUrl,
          aadharUrl,
          verified: false,
          timestamp: Date.now(),
        },
      });
  
      Alert.alert('Success', 'Documents uploaded. Awaiting verification.');
      onVerify?.({ carName, carNumber, livePhotoUrl });
      navigation.navigate('Offer');
    } catch (err) {
      console.error(err);
      Alert.alert('Upload Error', 'Something went wrong during upload.');
    }
  
    setUploading(false);
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify Your Profile!</Text>
      <Text style={styles.subHeading}>YOU'RE JUST ONE STEP AWAY!!</Text>

      <TouchableOpacity style={styles.photoBtn} onPress={() => handleImagePick('livePhoto')}>
        <Text style={styles.photoBtnText}>Pick Live Photo (Gallery)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.photoBtnAlt} onPress={() => handleImagePick('livePhoto', true)}>
        <Text style={styles.photoBtnText}>Take Live Photo (Camera)</Text>
      </TouchableOpacity>

      {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}

      <TextInput
        style={styles.input}
        placeholder="Car Name"
        value={formData.carName}
        onChangeText={(text) => setFormData({ ...formData, carName: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Car Number (XX 00 XX 0000)"
        value={formData.carNumber}
        onChangeText={handleCarNumberChange}
      />
      {errors.carNumber ? <Text style={styles.error}>{errors.carNumber}</Text> : null}

      <TouchableOpacity style={styles.uploadBtn} onPress={() => handleImagePick('aadharCard')}>
        <Text style={styles.uploadBtnText}>
          {formData.aadharCard ? formData.aadharCard.name : 'Upload Aadhar Card'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.verifyBtn, uploading && { backgroundColor: '#ccc' }]}
        onPress={handleVerification}
        disabled={uploading}
      >
        <Text style={styles.verifyBtnText}>
          {uploading ? 'Uploading...' : 'Verify Profile'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subHeading: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#aaa', borderRadius: 8, padding: 12, marginBottom: 10 },
  photoBtn: { backgroundColor: '#2563eb', padding: 10, borderRadius: 8, marginBottom: 8 },
  photoBtnAlt: { backgroundColor: '#1d4ed8', padding: 10, borderRadius: 8, marginBottom: 10 },
  photoBtnText: { color: '#fff', textAlign: 'center' },
  previewImage: { width: 100, height: 100, marginBottom: 15, borderRadius: 8 },
  uploadBtn: { backgroundColor: '#10b981', padding: 10, borderRadius: 8, marginBottom: 10 },
  uploadBtnText: { color: '#fff', textAlign: 'center' },
  verifyBtn: { backgroundColor: '#4f46e5', padding: 12, borderRadius: 8, marginTop: 10 },
  verifyBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 8 },
});

export default Verification;
