import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import AccountScreen from "./src/screens/AccountScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";

// SWITCH NAVIGATOR SETUP
const switchNavigator = createSwitchNavigator({
    loginFlow: createStackNavigator({
        Register: RegisterScreen,
        Login: LoginScreen,
    }),
    authFlow: createBottomTabNavigator({
        trackListFlow: createStackNavigator({
            TracList: TrackListScreen,
            TrackDetail: TrackDetailScreen,
        }),
        TrackCreate: TrackCreateScreen,
        Account: AccountScreen,
    }),
});

export default createAppContainer(switchNavigator);
