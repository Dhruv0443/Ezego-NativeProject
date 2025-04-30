import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Account from "./pages/Account"; // Renamed LoginPrompt to Accounts

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation }) => ({
                        headerTitle: () => (
                            <View style={styles.headerContainer}>
                                <Image
                                    source={require('./assets/logo.png')}
                                    style={styles.logo}
                                />
                                <Text style={styles.headerText}>Home</Text>
                            </View>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                                <Image
                                    source={require('./assets/user.png')}
                                    style={styles.headerImage}
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Faq"
                    component={Faq}
                    options={({ navigation }) => ({
                        headerTitle: () => (
                            <View style={styles.headerContainer}>
                                <Image
                                    source={require('./assets/logo.png')}
                                    style={styles.logo}
                                />
                                <Text style={styles.headerText}>FAQs</Text>
                            </View>
                        ),
                        headerRight: () => (
                            <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                                <Image
                                    source={require('./assets/user.png')}
                                    style={styles.headerImage}
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Account"
                    component={Account}
                    options={({ navigation }) => ({
                        headerTitle: () => (
                            <View style={styles.headerContainer}>
                                <Image
                                    source={require('./assets/logo.png')}
                                    style={styles.logo}
                                />
                                <Text style={styles.headerText}>Accounts</Text>
                            </View>
                        )
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    headerImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default App;
