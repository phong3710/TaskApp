import { CHANGE_CONNECTION_STATUS } from "../action/type"

const initialState = {
    isConnect: true,
    connectType: ""
}

const connectReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_CONNECTION_STATUS: 
            return{
                ...state,
                isConnect: action.payload,
                connectType: action.connectType

            }
        default: return state

    }
}
export default connectReducer;