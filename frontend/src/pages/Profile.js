import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar/navbar'
import "./profile.css"
import { useDispatch, useSelector } from 'react-redux'
import {useForm} from "react-hook-form"
import { updateProfile,profileUpload, GetCurrentUser} from '../apicalls/users'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usersFetchFailure, usersFetchSuccess } from '../redux/users/usersAction'
import {useNavigate} from 'react-router-dom'



function Profile() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const { handleSubmit, register, formState: { errors } } = useForm();
  
   const getuser=async()=>{
    try{
      const response=await GetCurrentUser();
      if(response.success){
        dispatch(usersFetchSuccess(response.data))
      }else{
        dispatch(usersFetchFailure(response.message))
        throw new Error(response.message);
      }
    }catch(err){
      dispatch(usersFetchFailure());
      toast.error(err.message);
      navigate('/login');
    }
   }

  const user=useSelector(value=>value.users.users)
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [name,setname]=useState(user.name)
  const [email,setemail]=useState(user.email)
  const [mobile, setMobile] = useState(user.mobile);
  const [address,setaddress]=useState(()=>{
    if(user.address)return user.address.address;
    else return null
  })
  const [state, setState] = useState(() => {
    if (user.address) return user.address.state;
    else return null
});
const [postcode, setPostcode] = useState(() => {
    if (user.address) return user.address.postcode;
    else return null
});

  const handleImageUpload = async (data) => {
       try{
        const formdata=new FormData()
        
        formdata.append("image", data);
        const response = await profileUpload(formdata);
        console.log(response,"IMAGEURL");
         if(response.success){
          setProfilePic(response.data);
          toast.success("profile picture uploaded");
         }else{
          throw new Error('profile picture upload failed !!');
         }
       }catch(err){
        toast.error(err.message);
       }
  }

  const submit=async(data)=>{
      try{
        console.log(data);
        const response=await updateProfile(data)
        if(response.success){
          toast.success(response.message);
        }else{
          throw new Error('error occured !!!');
        }
      }catch(err){
        toast.error(err.message)
      }
  }

    useEffect(()=>{
      getuser();
    },[]);

    useEffect(()=>{
      setProfilePic(user.profilePic);
            setname(user.name);
            setemail(user.email);
            setMobile(user.mobile);
            setaddress(() => {
                if (user.address) return user.address.address;
                else return null
            });
            setState(()=> {
                if (user.address) return user.address.state;
                else return null
            });
            setPostcode(() => {
                if (user.address) return user.address.postcode;
                else return null
            });
    },[]);

  return (
    <>
    {/* Include the Bootstrap CSS */}
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css"
        />

      {/* Your JSX content goes here */}

      {/* Include the Bootstrap JavaScript */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

      {/* Include jQuery */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <Navbar/>
   
    <div className="container  rounded bg-white mt-5 mb-5"  >
      <div className="row" >
        <div className="col-md-5 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src={profilePic||`https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg`} alt="Profile" />
            <span className="font-weight-bold">{name}</span>
            <span className="text-black-50">{email}</span>
          </div>
            <div className="file btn btn-sm btn-primary rounded d-flex justify-content-center align-items-center">
             <span className="mr-5">Change photo</span>
             <input type="file" id="file-input" onChange={(e) => handleImageUpload(e.target.files[0])} />
            </div>

        </div>
        <div className="col-md-5 ">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <form onSubmit={handleSubmit(submit)}>
            <div className="row mt-2">
              <div className="col-md-12">
                <label className="labels">Name</label>
                <input type="text" {...register("name", { required: true })} className="form-control" onChange={(e) => setname(e.target.value)} placeholder="enter your name" value={name} />
                {errors.name && <span style={{color:'red'}}>This field is required</span>}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input type="text" {...register("email", { required: true })} className="form-control" onChange={(e) => setemail(e.target.value)} placeholder="enter email id" value={email} />
                {errors.email && <span  style={{color:'red'}}>This field is required</span>}
              </div>
              <div className="col-md-12">
                <label className="labels">Mobile Number</label>
                <input type="text" {...register("mobile", { required: true, minLength: 10, maxLength: 10 })}  className="form-control" onChange={(e) => setMobile(e.target.value)} placeholder="enter phone number" value={mobile} />
                {errors.mobile && <span  style={{color:'red'}}>you must be type 10-digit number</span>}
              </div>
              <div className="col-md-12">
                <label className="labels">Address Line 1</label>
                <input type="text" {...register("address")} className="form-control" placeholder="enter address line " value={address} onChange={(e) => setaddress(e.target.value)} />
              </div>
              <div className="col-md-12">
                <label className="labels">Postcode</label>
                <input type="text"  {...register("postcode")}  className="form-control" placeholder="post code" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
              </div>
            </div>
            <div className="row mt-3">
                    {/* <div className="col-md-6"><label  className="labels">Country</label><input type="text" {...register("country")}  className="form-control" placeholder="country"/></div> */}
                    <div className="col-md-12"><label  className="labels">State/Region</label><input type="text" {...register("state")}  className="form-control"  placeholder="state" value={state} onChange={(e) => setState(e.target.value)} /></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Profile</button></div>
              <ToastContainer/>
                </form>
            </div>
        </div>
    </div>
</div>

    </>
  )
}


export default Profile
