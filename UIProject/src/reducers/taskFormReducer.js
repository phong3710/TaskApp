import {
    FETCH_TASK_FORM_REQUEST,
    FETCH_TASK_FORM_SUCCESS,
    FETCH_TASK_FORM_FAILED
} from '../action/type'

const initialState = {
    loading: false,
    taskForm: [], 
    error : ''
}

const taskFormReducer = ( state = initialState, action )=> {
    switch (action.type) {
        case FETCH_TASK_FORM_REQUEST: 
            return { 
                ...state,
                loading: true
            }
        case FETCH_TASK_FORM_SUCCESS:
            return {
                loading: false,
                taskForm: action.payload,
                error: ''
            }
        case FETCH_TASK_FORM_FAILED: 
            return {
                loading: false,
                taskForm: [],
                error: action.payload
            }
        default: return state
    }

}

export default taskFormReducer