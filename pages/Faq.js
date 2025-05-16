import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import questions from "../data/faq"; // Import FAQ data
const Faq = () => {
    const [isLoading, setIsLoading] = useState(true); // State to handle loader
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        // Simulate a delay (e.g., fetching data) by using a timeout
        const timer = setTimeout(() => {
            setIsLoading(false); // Hide loader after 4-5 seconds
        }, 2000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    const toggleContent = (id) => {
        setExpandedItems((prevExpandedItems) => ({
            ...prevExpandedItems,
            [id]: !prevExpandedItems[id],
        }));
    };

    if (isLoading) {
        // Show the loader while isLoading is true
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#10B981" />
                <Text style={styles.loaderText}>Loading FAQs...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Ecoride Help Centre</Text>
            {questions.map((item) => (
                <View key={item.id} style={styles.faqItem}>
                    <Text style={styles.question}>{item.ques}</Text>
                    {expandedItems[item.id] && <Text style={styles.answer}>{item.ans}</Text>}
                    <TouchableOpacity onPress={() => toggleContent(item.id)}>
                        <Text style={styles.toggleText}>
                            {expandedItems[item.id] ? "Read Less" : "Read More"}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6", // Softer background for the loading screen
    },
    loaderText: {
        fontSize: 16,
        color: "#64748B", // Slightly darker text for better readability
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#e5e7eb", // Light gray for a subtle background tone
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 26, // Slightly larger font for emphasis
        fontWeight: "bold",
        textAlign: "center",
        color: "#1f2937", // Deep gray for a clean and professional look
        marginBottom: 20,
        marginTop:20,
    },
    faqItem: {
        marginBottom: 20,
        backgroundColor: "#fff", // White card style for FAQ items
        padding: 16,
        borderRadius: 8, // Rounded corners for a modern design
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3, // Subtle shadow effect
        elevation: 3, // Shadow effect for Android
    },
    question: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827", // Dark gray for strong contrast
        marginBottom: 8,
    },
    answer: {
        fontSize: 16,
        color: "#374151", // Medium gray for balanced readability
        marginBottom: 8,
        lineHeight: 22, // Better spacing for multiline answers
    },
    toggleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#2563eb", // A vibrant blue for action text
        textAlign: "right",
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        marginTop: 10,
    },
});

export default Faq;