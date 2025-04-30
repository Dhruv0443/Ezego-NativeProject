import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const BookedRide = () => {
  // Dummy data for the ride
  const ride = {
    time: "9:00 AM",
    price: 350,
    leavingFrom: "Elante Mall, Chandigarh",
    goingTo: "Sector 17 Market, Chandigarh",
    driverPhoto: "https://www.shutterstock.com/image-vector/taxi-driver-driving-city-600nw-618671570.jpg", // External image URL
    driverName: "Rajesh Kumar",
    driverContact: "+91 9876543210",
    driverCarName: "Maruti Suzuki Swift",
    driverCarNumber: "PB10AB1234",
  };

  return (
    <View style={styles.container}>
    <Text>ABC</Text>
      <View style={styles.header}>
        <Text style={styles.time}>{ride.time}</Text>
        <Text style={styles.price}>Rs. {ride.price}</Text>
      </View>
      <View style={styles.location}>
        <View style={styles.flexRow}>
          <MaterialCommunityIcons name="dot-circle" size={20} style={styles.icon} />
          <Text>{ride.leavingFrom}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.flexRow}>
          <MaterialCommunityIcons name="dot-circle" size={20} style={styles.icon} />
          <Text>{ride.goingTo}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.driverInfo}>
          <Image source={{ uri: ride.driverPhoto }} style={styles.driverPhoto} />
          <View style={styles.driverDetails}>
            <Text>{ride.driverName}</Text>
            <View style={styles.flexRow}>
              <FontAwesome5 name="phone-alt" size={16} style={styles.icon} />
              <Text>{ride.driverContact}</Text>
            </View>
          </View>
        </View>
        <View style={styles.carInfo}>
          <FontAwesome5 name="car" size={40} style={styles.carIcon} />
          <View>
            <Text>{ride.driverCarName}</Text>
            <Text>{ride.driverCarNumber}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    alignSelf: "center",
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    alignItems: "center",
    marginVertical: 15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    borderLeftWidth: 2,
    borderColor: "gray",
    height: 40,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  driverDetails: {
    marginLeft: 15,
  },
  carInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  carIcon: {
    marginRight: 10,
  },
});

export default BookedRide;

// import React from "react";
// import { View, Text, Image, StyleSheet } from "react-native";
// import { FontAwesome5 } from "@expo/vector-icons"; // Replacement for `react-icons/fa6`
// import { MaterialCommunityIcons } from "@expo/vector-icons"; // Replacement for `react-icons/go`

// const BookedRide = ({ ride }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.time}>{ride.time}</Text>
//         <Text style={styles.price}>Rs. {ride.price}</Text>
//       </View>
//       <View style={styles.location}>
//         <View style={styles.flexRow}>
//           <MaterialCommunityIcons name="dot-circle" size={20} style={styles.icon} />
//           <Text>{ride.leavingFrom}</Text>
//         </View>
//         <View style={styles.line} />
//         <View style={styles.flexRow}>
//           <MaterialCommunityIcons name="dot-circle" size={20} style={styles.icon} />
//           <Text>{ride.goingTo}</Text>
//         </View>
//       </View>
//       <View style={styles.details}>
//         <View style={styles.driverInfo}>
//           <Image source={{ uri: ride.driverPhoto }} style={styles.driverPhoto} />
//           <View style={styles.driverDetails}>
//             <Text>{ride.driverName}</Text>
//             <View style={styles.flexRow}>
//               <FontAwesome5 name="phone-alt" size={16} style={styles.icon} />
//               <Text>{ride.driverContact}</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.carInfo}>
//           <FontAwesome5 name="car" size={40} style={styles.carIcon} />
//           <View>
//             <Text>{ride.driverCarName}</Text>
//             <Text>{ride.driverCarNumber}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#ffffff",
//     padding: 20,
//     marginTop: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     borderRadius: 10,
//     alignSelf: "center",
//     width: "90%",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   time: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   location: {
//     alignItems: "center",
//     marginVertical: 15,
//   },
//   flexRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   line: {
//     borderLeftWidth: 2,
//     borderColor: "gray",
//     height: 40,
//     marginVertical: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   details: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   driverInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   driverPhoto: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   driverDetails: {
//     marginLeft: 15,
//   },
//   carInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   carIcon: {
//     marginRight: 10,
//   },
// });

// export default BookedRide;