import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, StyleSheet, Alert } from "react-native";
import places from "../data/places";
import driverQuestions from "../data/driverFaq";

const OfferRide = () => {
  const today = new Date().toISOString().split("T")[0];
  const [currentTime, setCurrentTime] = useState("");
  const [leavingFrom, setLeavingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(currentTime);
  const [passengers, setPassengers] = useState(1);
  const [price, setPrice] = useState("");
  const [filteredLeavingFrom, setFilteredLeavingFrom] = useState([]);
  const [filteredGoingTo, setFilteredGoingTo] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [showLeavingSuggestions, setShowLeavingSuggestions] = useState(false);
  const [showGoingSuggestions, setShowGoingSuggestions] = useState(false);

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "leavingFrom":
        setLeavingFrom(value);
        setFilteredLeavingFrom(
          places.filter((place) =>
            place.toLowerCase().startsWith(value.toLowerCase())
          )
        );
        setShowLeavingSuggestions(true);
        break;
      case "goingTo":
        setGoingTo(value);
        setFilteredGoingTo(
          places.filter((place) =>
            place.toLowerCase().startsWith(value.toLowerCase())
          )
        );
        setShowGoingSuggestions(true);
        break;
      case "date":
        setDate(value);
        break;
      case "time":
        setTime(value);
        break;
      case "price":
        setPrice(value);
        break;
      default:
        break;
    }
  };

  const publishRide = () => {
    if (!leavingFrom || !goingTo || !price) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    if (leavingFrom === goingTo) {
      Alert.alert("Error", "Pick-up and Drop destinations cannot be same.");
      return;
    }

    Alert.alert("Success", "Ride details have been noted locally!");
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Share your ride with passengers!</Text>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Leaving From"
          value={leavingFrom}
          onChangeText={(text) => handleInputChange("leavingFrom", text)}
        />
        {showLeavingSuggestions && (
          <FlatList
            data={filteredLeavingFrom}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setLeavingFrom(item);
                  setShowLeavingSuggestions(false);
                }}
              >
                <Text style={styles.suggestion}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Going To"
          value={goingTo}
          onChangeText={(text) => handleInputChange("goingTo", text)}
        />
        {showGoingSuggestions && (
          <FlatList
            data={filteredGoingTo}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setGoingTo(item);
                  setShowGoingSuggestions(false);
                }}
              >
                <Text style={styles.suggestion}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={(text) => handleInputChange("date", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Time (HH:MM)"
          value={time}
          onChangeText={(text) => handleInputChange("time", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (₹)"
          keyboardType="numeric"
          value={price}
          onChangeText={(text) => handleInputChange("price", text)}
        />

        {/* Passenger Count */}
        <View style={styles.passengerRow}>
          <TouchableOpacity
            onPress={() => setPassengers((prev) => Math.max(1, prev - 1))}
          >
            <Text style={styles.passengerButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.passengerText}>
            {passengers} {passengers === 1 ? "Passenger" : "Passengers"}
          </Text>
          <TouchableOpacity
            onPress={() => setPassengers((prev) => Math.min(4, prev + 1))}
          >
            <Text style={styles.passengerButton}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.publishButton} onPress={publishRide}>
          <Text style={styles.publishButtonText}>Publish Ride</Text>
        </TouchableOpacity>
      </View>

      {/* FAQ */}
      <Text style={styles.heading}>Help Centre</Text>
      {driverQuestions.map((item) => (
        <View key={item.id} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <Text style={styles.question}>{item.ques}</Text>
          </TouchableOpacity>
          {expandedItems[item.id] && (
            <Text style={styles.answer}>{item.ans}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 22, fontWeight: "bold", marginVertical: 10, textAlign: "center" },
  form: { marginVertical: 20 },
  input: { borderWidth: 1, borderColor: "gray", borderRadius: 8, padding: 10, marginBottom: 10 },
  suggestion: { padding: 10, backgroundColor: "#eee" },
  passengerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 10 },
  passengerButton: { fontSize: 24, paddingHorizontal: 20 },
  passengerText: { fontSize: 18 },
  publishButton: { backgroundColor: "green", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  publishButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  faqItem: { marginVertical: 10 },
  question: { fontSize: 16, fontWeight: "bold" },
  answer: { fontSize: 14, marginTop: 5, color: "gray" },
});

export default OfferRide;
