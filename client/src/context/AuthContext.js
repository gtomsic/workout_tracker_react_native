import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";

import { navigate } from "../navigationRef";

import trackerApi from "../api/tracker";
import {
    REGISTER_POST_FAILED,
    REGISTER_POST_REQUEST,
    REGISTER_POST_SUCCESS,
} from "../contants/authContants";

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_POST_REQUEST:
            return { ...state, loading: true };
        case REGISTER_POST_SUCCESS:
            return {
                ...state,
                error: "",
                loading: false,
                token: action.payload,
            };
        case REGISTER_POST_FAILED:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const register = (dispatch) => async (email, password, confirmed_password) => {
    try {
        dispatch({ type: REGISTER_POST_REQUEST });
        const { data } = await trackerApi.post("api/auth/register", {
            email,
            password,
            confirmed_password,
        });
        if (!data.token) {
            return dispatch({
                type: REGISTER_POST_FAILED,
                payload: data.message,
            });
        }
        await AsyncStorage.setItem("token", data.token);
        dispatch({
            type: REGISTER_POST_SUCCESS,
            payload: data.token,
        });
        navigate("TrackList");
    } catch (err) {
        dispatch({
            type: REGISTER_POST_FAILED,
            payload: err.message,
        });
    }
};

const login = (dispatch) => {
    return async (email, password) => {
        // make api request to login with email and password
        // success update the state isSignIn
    };
};
const logout = (dispatch) => {
    return () => {
        // signout
    };
};
export const { Provider, Context } = createDataContext(
    authReducer,
    { register, login, logout },
    {
        token: null,
    }
);
