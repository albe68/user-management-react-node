import {axiosInstance} from "./axiosInstance"

export const RegisterUser=async(payload)=>{
    try{
        console.log("api call @users checking payload",payload)
        const response= await axiosInstance.post('api/users/signup',payload)
        return response.data
    }catch(err){
        return err.message;
    }
}

export const LoginUser=async(payload)=>{
    try{
        console.log(payload,"api call @users checking payload");
        const response = await axiosInstance.post('/api/users/login', payload);
        return response.data;
    }catch(err){
        return err.message;
    }
}

export const GetCurrentUser =async ()=>{
    try{
      const response=await axiosInstance.get('/api/users/get-user-data');
      return response.data
    }catch(err){
        return err.message
    }
}

export const updateProfile=async (payload)=>{
    try{
   const response=await axiosInstance.post('/api/users/update-user-data',payload)
       return response.data
    }catch(err){
        return err.message
    }
}

export const profileUpload = async (payload) => {
    try {
        console.log(payload);
        const response = await axiosInstance.post('/api/users/profilepic-upload', payload, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data;
    } catch (err) {
        return err.message;
    }
}