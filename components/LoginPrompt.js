import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginPrompt = () => {
    const navigation = useNavigation();

    const handleProceed = () => {
        navigation.navigate('Account');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Please Login to Continue</Text>
                <Text style={styles.subtitle}>
                    Access to this page requires authentication. Please proceed to your account by logging in.
                </Text>
                <TouchableOpacity onPress={handleProceed} style={styles.button}>
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb', // Optional: background
    },
    card: {
        backgroundColor: 'white',
        padding: 24,
        margin: 16,
        alignItems: 'center',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#155e75', // cyan-800
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#155e75',
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#155e75',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginPrompt;
