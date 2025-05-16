// import React from 'react';
// import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
// import IconFacebook from 'react-native-vector-icons/FontAwesome';
// import IconInstagram from 'react-native-vector-icons/FontAwesome';
// import IconTwitter from 'react-native-vector-icons/FontAwesome';
// import IconYoutube from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';

// const Footer = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.footer}>
//       <View style={styles.row}>  
//         <View style={styles.column}>
//           {/* <Text style={styles.heading}></Text> */}
//           <View style={styles.socialRow}>
//             <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com')}>
//               <IconFacebook name="facebook-square" size={32} style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com')}>
//               <IconInstagram name="instagram" size={32} style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => Linking.openURL('https://www.twitter.com')}>
//               <IconTwitter name="twitter-square" size={32} style={styles.icon} />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com')}>
//               <IconYoutube name="youtube-play" size={32} style={styles.icon} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     backgroundColor: '#e5e7eb', // Tailwind gray-200
//     paddingVertical: 24,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     // paddingHorizontal: 10,
//     flexWrap: 'wrap',
//   },
//   column: {
//     width: '40%',
//     marginVertical: 12,
//     textAlign:'center',
//   },
//   heading: {
//     fontSize: 16,
//     fontWeight: '600',
//     // marginBottom: 12,
//     color: '#1e293b', // slate-800
//   },
//   item: {
//     fontSize: 14,
//     marginBottom: 6,
//     color: '#1e293b',
//   },
//   link: {
//     textDecorationLine: 'underline',
//   },
//   socialRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginTop: 8,
//   },
//   icon: {
//     marginRight: 10,
//     color: 'black',
//   },
// });

// export default Footer;
import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import IconFacebook from 'react-native-vector-icons/FontAwesome';
import IconInstagram from 'react-native-vector-icons/FontAwesome';
import IconTwitter from 'react-native-vector-icons/FontAwesome';
import IconYoutube from 'react-native-vector-icons/FontAwesome';

const openAppOrStore = async (appUrl, storeUrl) => {
  const canOpen = await Linking.canOpenURL(appUrl);
  if (canOpen) {
    Linking.openURL(appUrl);
  } else {
    Linking.openURL(storeUrl);
  }
};

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.row}>  
        <View style={styles.column}>
          <View style={styles.socialRow}>
            <TouchableOpacity onPress={() => openAppOrStore('fb://page/yourPageID', 'https://play.google.com/store/apps/details?id=com.facebook.katana')}>
              <IconFacebook name="facebook-square" size={32} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openAppOrStore('instagram://user?username=yourUsername', 'https://play.google.com/store/apps/details?id=com.instagram.android')}>
              <IconInstagram name="instagram" size={32} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openAppOrStore('twitter://user?screen_name=yourUsername', 'https://play.google.com/store/apps/details?id=com.twitter.android')}>
              <IconTwitter name="twitter-square" size={32} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openAppOrStore('vnd.youtube://channel/yourChannelID', 'https://play.google.com/store/apps/details?id=com.google.android.youtube')}>
              <IconYoutube name="youtube-play" size={32} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  column: {
    width: '40%',
    marginVertical: 12,
    textAlign:'center',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  icon: {
    marginRight: 10,
    color: 'black',
  },
});

export default Footer;
