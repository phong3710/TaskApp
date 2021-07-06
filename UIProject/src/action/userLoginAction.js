import {
    FETCH_USER_LOGIN_REQUEST,
    FETCH_USER_LOGIN_SUCCESS,
    FETCH_USER_LOGIN_FAILED,
    SET_USER_LOGOUT,
} from './type'
import axios from 'axios'

export const fetchUserLoginRequest = () => {
    return {
        type: FETCH_USER_LOGIN_REQUEST
    }
}

export const fetchUserLoginSuccess = ( user ) => {
    console.log("login")

    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: user
    }
}

export const fetchUserLoginFailed = ( error ) => {
    return {
        type: FETCH_USER_LOGIN_FAILED,
        payload: error
    }
}

export const setUserLogout = () => {
    return {
        type: SET_USER_LOGOUT
    }
}

