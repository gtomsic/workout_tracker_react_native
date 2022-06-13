import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import React from "react";

import Spacer from "../components/Spacer";

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.containerStyle}>
            <Text h3 style={styles.heading}>
                Workout Tracker
            </Text>
            <Spacer></Spacer>
            <Input label="Email" />
            <Spacer></Spacer>
            <Input label="Password" />
            <Spacer></Spacer>
            <Input label="Confirm Password" />
            <Spacer>
                <Button title="Register" />
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
    },
    heading: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 30,
    },
    button: {
        marginHorizontal: 8,
    },
});
