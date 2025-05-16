import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function CarLoader() {
  const carPosition = useRef(new Animated.Value(-100)).current; // Start off-screen

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(carPosition, {
          toValue: screenWidth,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(carPosition, {
          toValue: -100,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [carPosition]);

  return (
    <View>
      <Animated.View style={[styles.car, { transform: [{ translateX: carPosition }] }]}>
        {/* Replace with your own car image if needed */}
        <Image
          source={require('../assets/car.png')} // Or use an emoji with Text instead
          style={styles.carImage}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',  // Center vertically
      alignItems: 'center',       // Center horizontally
    },
    car: {
      transform: [{ scale: 4 }],  // Makes the image appear bigger
    },
    carImage: {
      width: 500,  // Keep original width
      height: 300,  // Keep original height
    //   resizeMode: 'contain',
    },
  });
