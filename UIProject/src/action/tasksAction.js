import {
    FETCH_TASKS_REQUEST, 
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILED
} from '../action/type'

export const fetchTasksRequest = () => {
    return {
        type: FETCH_TASKS_REQUEST,
    }
}

export const fetchTasksSuccess = (tasks) => {
    return  {
        type: FETCH_TASKS_SUCCESS,
        payload: tasks
    }
}

export const fetchTasksFailed = ( error ) => {
    return {
        type: FETCH_TASKS_FAILED,
        payload: error
    }
}