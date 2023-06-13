import React,{useRef,useEffect,useState} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { updateUserPost } from '../apicalls/admin';
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/adminUsers/adminUsersAction';

function UserEditModal({user,modalVisibilty}) {
    const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 } } = useForm()


    const [editId, setEditId] = useState(user._id);
    const [editName, setEditName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(user.email);
    const [editMobile, setEditMobile] = useState(user.mobile);
    const dispatch=useDispatch()


    const editModalShow = useRef();
    const closeBtn = useRef(null);

    const handleOpenBtn=()=>{
        editModalShow.current.click();
    }


   const handleUpdate=async(data)=>{
       try{
           console.log(data);
        const response = await updateUserPost(data)
        if (response.data.success) {
            toast.success(response.data.message);
            modalVisibilty(false);
            closeBtn.current.click();
            dispatch(getUsers());
        } else {
            throw new Error('error occured !!!');
        }
       }catch(err){
        toast.error(err.message);
       }
   }




    useEffect(()=>{
        handleOpenBtn();
    },[]);


  return (
    <>
    <button type="button" ref={editModalShow} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal"></button>

<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Details</h5>
        <button type="button" className="close" data-dismiss="modal" ref={closeBtn}  aria-label="Close" onClick={()=>{
            closeBtn.current.click();
            modalVisibilty(false);
        }}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit3(handleUpdate)}>
        <div className="col-md-12"><label className="labels"></label><input type="text" {...register3("editId", { required: true })} value={editId} onChange={(e)=>setEditId(e.target.value)}  className="form-control d-none" placeholder="Name" /></div>
          <div className="row mt-2">
            <div className="col-md-12"><label className="labels">Name</label><input type="text" {...register3("editName", { required: true })} value={editName} onChange={(e) => setEditName(e.target.value)}  className="form-control" placeholder="Name" /></div>
            {errors3.editName && <span style={{ color: 'red' }}>This field is required</span>}
          </div>
          <div className="row">
            <div className="col-md-12 mt-3"><label className="labels">Email ID</label><input type="text" {...register3("editEmail", { required: true })} value={editEmail} onChange={(e) => setEditEmail(e.target.value)}  className="form-control" placeholder="enter email id"  /></div>
            {errors3.editEmail && <span style={{ color: 'red' }}>This field is required</span>}
            <div className="col-md-12 mt-3"><label className="labels">Mobile Number</label><input type="text"  className="form-control" placeholder="enter phone number" {...register3("editMobile", { required: true, minLength: 10, maxLength: 10 })} value={editMobile} onChange={(e) => setEditMobile(e.target.value)}  /></div>
            {errors3.editMobile && <span style={{ color: 'red' }}>No change occured</span>}
          </div>
          <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Save Changes</button></div>
        </form>
      </div>

    </div>
  </div>
</div> 
</>
  )
}

export default UserEditModal
