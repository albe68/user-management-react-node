import {FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS} from '../users/usersType'

const initialState={
    adminUsers: [],
    error: ''
}

const adminUsersReducer=(state=initialState, action)=>{
    switch(action.type){
        case FETCH_USERS_FAILURE:
            return{
                adminUsers: [],
                error: action.payload
            }
        case FETCH_USERS_SUCCESS:
            return{
                adminUsers: action.payload,
                error: ''
            }
        default: return state
    }
}

export default adminUsersReducer;