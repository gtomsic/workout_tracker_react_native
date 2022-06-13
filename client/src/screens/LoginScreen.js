import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const LoginScreen = ({ navigation }) => {
    return (
        <View>
            <Text>LoginScreen</Text>
            <Button
                title="Go to Register Screen"
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
