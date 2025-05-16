import { firebase } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDSZJyPu1b0M1rvmi1rJBEH2Gbnne4dwZ0",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "YOUR-ID",
  appId: "1:397747793853:android:a8138fe9362c281c552cd4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
