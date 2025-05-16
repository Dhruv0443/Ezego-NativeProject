// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { launchCamera } from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker';
// import axios from 'axios';
// import API_BASE_URL from '../ApiBaseURL';
// import CookieManager from '@react-native-cookies/cookies'; // For native cookies

// const Verification = ({ onVerify }) => {
//   const [formData, setFormData] = useState({
//     aadharCard: null,
//     carName: '',
//     carNumber: '',
//     livePhoto: null,
//   });

//   const [photoUri, setPhotoUri] = useState(null);
//   const [verificationStatus, setVerificationStatus] = useState('');
//   const [errors, setErrors] = useState({});

//   const validateCarNumber = (carNumber) => {
//     const re = /^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/;
//     return re.test(String(carNumber));
//   };

//   const handleCarNumberChange = (text) => {
//     setFormData({ ...formData, carNumber: text });
//     setErrors({
//       ...errors,
//       carNumber: validateCarNumber(text) ? '' : 'Format: XX 00 XX 0000',
//     });
//   };

//   const handleLivePhotoCapture = async () => {
//     const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });

//     if (!result.didCancel && result.assets && result.assets.length > 0) {
//       const photo = result.assets[0];
//       setFormData({ ...formData, livePhoto: { uri: photo.uri, type: photo.type, name: photo.fileName } });
//       setPhotoUri(photo.uri);
//     }
//   };

//   const handleAadharUpload = async () => {
//     try {
//       const result = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.images] });
//       setFormData({ ...formData, aadharCard: result });
//     } catch (err) {
//       if (!DocumentPicker.isCancel(err)) console.warn(err);
//     }
//   };

//   const handleVerification = async () => {
//     if (!formData.carName || !formData.carNumber || !formData.aadharCard || !formData.livePhoto) {
//       setVerificationStatus('Please fill in all fields');
//       return;
//     }

//     const newData = new FormData();
//     newData.append('carName', formData.carName);
//     newData.append('carNumber', formData.carNumber);
//     newData.append('livePhoto', {
//       uri: formData.livePhoto.uri,
//       type: formData.livePhoto.type,
//       name: formData.livePhoto.name,
//     });

//     try {
//       const cookies = await CookieManager.get(API_BASE_URL);
//       const token = cookies?.accessToken?.value;

//       const res = await axios.post(`${API_BASE_URL}users/verifyDriver`, newData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.data.statusCode === 201) {
//         Alert.alert('Success', 'Profile verified successfully');
//         onVerify({
//           carName: formData.carName,
//           carNumber: formData.carNumber,
//           livePhoto: formData.livePhoto,
//         });
//       } else {
//         setVerificationStatus('Verification failed. Please try again.');
//       }
//     } catch (err) {
//       console.error('Verification error:', err);
//       setVerificationStatus('Verification failed. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Verify Your Profile!</Text>
//       <Text style={styles.subHeading}>YOU'RE JUST ONE STEP AWAY!!</Text>

//       <TouchableOpacity style={styles.photoBtn} onPress={handleLivePhotoCapture}>
//         <Text style={styles.photoBtnText}>Capture Live Photo</Text>
//       </TouchableOpacity>

//       {photoUri && (
//         <Image source={{ uri: photoUri }} style={styles.previewImage} />
//       )}

//       <TextInput
//         style={styles.input}
//         placeholder="Car Name"
//         value={formData.carName}
//         onChangeText={(text) => setFormData({ ...formData, carName: text })}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Car Number (XX 00 XX 0000)"
//         value={formData.carNumber}
//         onChangeText={handleCarNumberChange}
//       />
//       {errors.carNumber ? <Text style={styles.error}>{errors.carNumber}</Text> : null}

//       <TouchableOpacity style={styles.uploadBtn} onPress={handleAadharUpload}>
//         <Text style={styles.uploadBtnText}>
//           {formData.aadharCard ? 'Aadhar Selected' : 'Upload Aadhar Card'}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.verifyBtn} onPress={handleVerification}>
//         <Text style={styles.verifyBtnText}>Verify Profile</Text>
//       </TouchableOpacity>

//       {verificationStatus ? <Text style={styles.error}>{verificationStatus}</Text> : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     marginTop: 40,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subHeading: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#555',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//   },
//   photoBtn: {
//     backgroundColor: '#2563eb',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   photoBtnText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   previewImage: {
//     width: 100,
//     height: 100,
//     marginBottom: 15,
//     borderRadius: 8,
//   },
//   uploadBtn: {
//     backgroundColor: '#10b981',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   uploadBtnText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   verifyBtn: {
//     backgroundColor: '#4f46e5',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   verifyBtnText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 8,
//   },
// });

// export default Verification;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import API_BASE_URL from '../ApiBaseURL';
import CookieManager from '@react-native-cookies/cookies';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions'; // Permissions Handling

const Verification = ({ onVerify }) => {
  const [formData, setFormData] = useState({
    aadharCard: null,
    carName: '',
    carNumber: '',
    livePhoto: null,
  });

  const [photoUri, setPhotoUri] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [errors, setErrors] = useState({});

  // **Request Permissions on Load**
  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission =
        Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
      const storagePermission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY;

      const cameraStatus = await check(cameraPermission);
      if (cameraStatus !== RESULTS.GRANTED) await request(cameraPermission);

      const storageStatus = await check(storagePermission);
      if (storageStatus !== RESULTS.GRANTED) await request(storagePermission);
    };

    requestPermissions();
  }, []);

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

  const handleLivePhotoCapture = async () => {
    try {
      const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });

      if (result.didCancel) {
        console.warn('User cancelled camera');
      } else if (result.errorMessage) {
        console.error('Camera error:', result.errorMessage);
        Alert.alert('Camera Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        const photo = result.assets[0];
        setFormData({ ...formData, livePhoto: { uri: photo.uri, type: photo.type, name: photo.fileName } });
        setPhotoUri(photo.uri);
      }
    } catch (error) {
      console.error('Camera launch error:', error);
      Alert.alert('Error', 'Failed to open camera.');
    }
  };

  const handleAadharUpload = async () => {
    try {
      const result = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.images] });
      setFormData({ ...formData, aadharCard: result });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.warn('User cancelled document selection');
      } else {
        console.error('Document Picker error:', err);
        Alert.alert('Error', 'Failed to select a document.');
      }
    }
  };

  const handleVerification = async () => {
    if (!formData.carName || !formData.carNumber || !formData.aadharCard || !formData.livePhoto) {
      setVerificationStatus('Please fill in all fields');
      return;
    }

    const newData = new FormData();
    newData.append('carName', formData.carName);
    newData.append('carNumber', formData.carNumber);
    newData.append('livePhoto', {
      uri: formData.livePhoto.uri,
      type: formData.livePhoto.type,
      name: formData.livePhoto.name,
    });

    try {
      const cookies = await CookieManager.get(API_BASE_URL);
      const token = cookies?.accessToken?.value;

      const res = await axios.post(`${API_BASE_URL}users/verifyDriver`, newData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.statusCode === 201) {
        Alert.alert('Success', 'Profile verified successfully');
        onVerify({
          carName: formData.carName,
          carNumber: formData.carNumber,
          livePhoto: formData.livePhoto,
        });
      } else {
        setVerificationStatus('Verification failed. Please try again.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setVerificationStatus('Verification failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify Your Profile!</Text>
      <Text style={styles.subHeading}>YOU'RE JUST ONE STEP AWAY!!</Text>

      <TouchableOpacity style={styles.photoBtn} onPress={handleLivePhotoCapture}>
        <Text style={styles.photoBtnText}>Capture Live Photo</Text>
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

      <TouchableOpacity style={styles.uploadBtn} onPress={handleAadharUpload}>
        <Text style={styles.uploadBtnText}>
          {formData.aadharCard ? 'Aadhar Selected' : 'Upload Aadhar Card'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerification}>
        <Text style={styles.verifyBtnText}>Verify Profile</Text>
      </TouchableOpacity>

      {verificationStatus ? <Text style={styles.error}>{verificationStatus}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  photoBtn: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  photoBtnText: {
    color: '#fff',
    textAlign: 'center',
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 8,
  },
  uploadBtn: {
    backgroundColor: '#10b981',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadBtnText: {
    color: '#fff',
    textAlign: 'center',
  },
  verifyBtn: {
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  verifyBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default Verification;
