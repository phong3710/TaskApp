import {
    FETCH_USER_LOGIN_REQUEST,
    FETCH_USER_LOGIN_FAILED, 
    FETCH_USER_LOGIN_SUCCESS,
    SET_USER_LOGOUT
} from '../action/type'

const initialState = {
    userLogin : [],
    error: '',
}

const UserLoginReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case FETCH_USER_LOGIN_REQUEST:
            return { 
                ...state,
                isLoading: true
            }
        case FETCH_USER_LOGIN_SUCCESS:
        {
            return {
                userLogin: action.payload,
                error: ''
            }
        }
        case FETCH_USER_LOGIN_FAILED: 
            return {
                userLogin: [],
                error: action.payload
            }
        case SET_USER_LOGOUT:
            return {
                ...state,
                userLogin: [],
            }
        
        default: return state
    }
}

export default UserLoginReducer;