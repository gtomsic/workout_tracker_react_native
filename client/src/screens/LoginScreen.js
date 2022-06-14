import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import React, { useState, useContext, useEffect } from "react";

import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { state, login } = useContext(AuthContext);
    const { loading, token, error } = state;
    return (
        <View style={styles.containerStyle}>
            <Text h3 style={styles.heading}>
                Login
            </Text>
            <Spacer></Spacer>
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                label="Email"
            />
            <Spacer></Spacer>
            <Input
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                label="Password"
            />
            <Spacer></Spacer>
            {error ? (
                <Spacer>
                    <Text style={styles.error}>{error}</Text>
                </Spacer>
            ) : null}
            <Spacer>
                <Button onPress={() => login(email, password)} title="Login" />
            </Spacer>
            <Spacer>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.link}>No account? Register Here</Text>
                </TouchableOpacity>
            </Spacer>
        </View>
    );
};

RegisterScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};
export default RegisterScreen;

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 100,
        paddingHorizontal: "10%",
    },
    heading: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        marginHorizontal: 8,
    },
    error: {
        fontSize: 16,
        color: "red",
    },
    link: {
        color: "blue",
        textAlign: "center",
    },
});
