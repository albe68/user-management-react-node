import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from './usersType'

export const usersFetchSuccess=(users)=>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
export const usersFetchFailure=(error)=>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}
