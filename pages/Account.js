import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // ✅ Correct Icon package

const Account = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            // Dummy data for API response
            const data = {
                statusCode: 200,
                data: {
                    user: {
                        email: formData.email,
                        name: "John Doe",
                        contact: "9876543210",
                        isDriver: false,
                        driverVerification: {
                            carName: "Toyota Prius",
                            carNumber: "XYZ123",
                            livePhoto: "https://example.com/live-photo.jpg",
                        },
                        savedRides: [],
                    },
                    accessToken: "dummyAccessToken",
                    refreshToken: "dummyRefreshToken",
                }
            };

            if (data.statusCode === 200) {
                const userData = {
                    email: data.data.user.email,
                    name: data.data.user.name,
                    contact: data.data.user.contact,
                    isDriver: data.data.user.isDriver,
                    carName: data.data.user.driverVerification?.carName || '',
                    carNumber: data.data.user.driverVerification?.carNumber || '',
                    livePhoto: data.data.user.driverVerification?.livePhoto || '',
                    savedRides: data.data.user.savedRides || [],
                };

                Alert.alert('Success', 'Login successful');
                onLogin(userData);
            } else {
                Alert.alert('Error', 'Error logging into account');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error');
        }
    };

    const handleSignup = async () => {
        try {
            Alert.alert('Success', 'Signup successful');
        } catch (error) {
            Alert.alert('Error', 'Network error');
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validateContact = (contact) => {
        const re = /^[9876][0-9]{9}$/;
        return re.test(String(contact));
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (!isLogin) {
            let newErrors = { ...errors };
            switch (name) {
                case 'email':
                    newErrors.email = validateEmail(value) ? '' : 'Invalid email';
                    break;
                case 'contact':
                    newErrors.contact = validateContact(value) ? '' : 'Invalid contact number';
                    break;
                case 'password':
                    newErrors.password = validatePassword(value) ? '' : 'Weak password';
                    break;
                default:
                    break;
            }
            setErrors(newErrors);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>
                {isLogin ? "Login" : "Sign Up"}
            </Text>

            {!isLogin && (
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(value) => handleChange('name', value)}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
            />
            {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

            {!isLogin && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Contact"
                        keyboardType="phone-pad"
                        value={formData.contact}
                        onChangeText={(value) => handleChange('contact', value)}
                    />
                    {errors.contact ? <Text style={styles.error}>{errors.contact}</Text> : null}
                </>
            )}

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(value) => handleChange('password', value)}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon
                        name={showPassword ? "eye-slash" : "eye"}
                        size={22}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}

            <TouchableOpacity
                onPress={isLogin ? handleLogin : handleSignup}
                style={styles.button}
            >
                <Text style={styles.buttonText}>
                    {isLogin ? "Login" : "Sign Up"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.switchText}>
                    {isLogin ? "Don't have an account? Sign up now!" : "Already have an account? Log in!"}
                </Text>
            </TouchableOpacity>

            <Image
                source={{ uri: "https://example.com/account-image.jpg" }}
                style={styles.image}
                resizeMode="contain"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 8,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 14,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    switchText: {
        color: '#007BFF',
        marginTop: 12,
        textDecorationLine: 'underline',
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 20,
    },
});

export default Account;
