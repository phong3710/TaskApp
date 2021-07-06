import {
    FETCH_TASKS_REQUEST, 
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILED
} from '../action/type'

const initialState = {
    loading: false,
    tasks: [], 
    error : ''
}

const tasksReducer = ( state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_TASKS_SUCCESS:
            return {
                loading : false,
                tasks : action.payload,
                error: ''
            }
        case FETCH_TASKS_FAILED:
            return {
                loading: false,
                tasks: [],
                error: action.payload
            }
        default: return state
    }
}
export default tasksReducer;