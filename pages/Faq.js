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
        }, 4000);

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
        backgroundColor: "#fff",
    },
    loaderText: {
        fontSize: 16,
        color: "#4A5568",
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4A5568",
        marginBottom: 20,
    },
    faqItem: {
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2D3748",
        marginBottom: 8,
    },
    answer: {
        fontSize: 16,
        color: "#4A5568",
        marginBottom: 8,
    },
    toggleText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#3182CE",
        textAlign: "right",
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        marginTop: 10,
    },
});

export default Faq;
