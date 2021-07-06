import {    
    FETCH_TOKEN_FAILED,
    FETCH_TOKEN_REQUEST,
    FETCH_TOKEN_SUCCESS,
    RESTORE_TOKEN,
} from './type'
import axios from 'axios'
import { apiAuthUrl } from '../../ApiConfig/ApiConfig'

export const fetchTokenRequest = () => {
    return {
        type: FETCH_TOKEN_REQUEST
    }
}

export const fetchTokenSucess = ( token ) => {
    return {
        type: FETCH_TOKEN_SUCCESS,
        payload: token
    }
}


export const fetchTokenFailed = ( error ) => {
    return {
        type: FETCH_TOKEN_FAILED,
        payload: error
    }
}

export const restoreToken = (tokenStorage) => {
    return {
        type: RESTORE_TOKEN,
        payload: tokenStorage
    }
}


