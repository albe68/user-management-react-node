
import { FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS } from '../users/usersType';

import {GetUsers} from "../../apicalls/admin"

export const AdminUsersFetchSuccess=(users)=>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
export const AdminUsersFetchFailure=(error)=>{
    return{
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const getUsers=()=>{
    return async(dispatch)=>{
        try{
         
            const response = await GetUsers();
                 
            if(response.data.success){
                dispatch(AdminUsersFetchSuccess(response.data.users));
            }else{
                throw new Error("error occured !!!");
            }
        }catch(err){
            dispatch(AdminUsersFetchFailure(err.message));
        }
    }
}