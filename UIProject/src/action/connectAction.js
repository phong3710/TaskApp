import { CHANGE_CONNECTION_STATUS } from "./type"

export const changeConnection = (status, connectType) => {
    return {
        type: CHANGE_CONNECTION_STATUS,
        payload: status,
        connectType: connectType
    }
}