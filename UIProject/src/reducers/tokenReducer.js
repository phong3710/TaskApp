import {
    FETCH_TOKEN_FAILED,
    FETCH_TOKEN_REQUEST,
    FETCH_TOKEN_SUCCESS,
    RESTORE_TOKEN
} from '../action/type'

const initialState = {
    loading: false,
    token : [],
    error: '', 
    tokenRestore:null
}

const tokenReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case FETCH_TOKEN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_TOKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload,
                error: ''
            }
        case FETCH_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
                token: [],
                error: action.payload
            }
        case RESTORE_TOKEN: 
            return {
                ...state,
                tokenRestore: action.payload
            }
        default: return state
    }
}
export default tokenReducer