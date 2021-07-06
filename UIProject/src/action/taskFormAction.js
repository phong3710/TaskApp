import {
    FETCH_TASK_FORM_REQUEST,
    FETCH_TASK_FORM_SUCCESS,
    FETCH_TASK_FORM_FAILED
} from '../action/type'

export const fetchTaskFormRequest = () => {
    return {
        type: FETCH_TASK_FORM_REQUEST
    }
}

export const fetchTaskFormSuccess = (data) => {
    return {
        type: FETCH_TASK_FORM_SUCCESS,
        payload: data
    }
}

export const fetchTaskFormFailed = (error) => {
    return {
        type: FETCH_TASK_FORM_FAILED,
        payload: error
    }
}
