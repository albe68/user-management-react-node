import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminUsersFetchSuccess, getUsers } from '../../redux/adminUsers/adminUsersAction'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { searchUsers } from '../../apicalls/admin';
import { Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { RegisterUser } from '../../apicalls/users';
import { deleteUser } from "../../apicalls/admin"
import UserEditModal from '../../modal/UserEditModal';
import { FaChevronRight } from 'react-icons/fa';




function UserView() {


     const dispatch = useDispatch()
     const navigete = useNavigate()
     const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm()
     const { register, handleSubmit, formState: { errors }, reset } = useForm();
     const buttonRef = useRef(null);
     const [Admin, setAdmin] = useState('Admin')
     const [modal, setmodal] = useState(false)
     const [selectedItem, setItem] = useState(null);
     const [showEditModal, setShowEditModal] = useState(false);




  const onSearchSubmit = async (data) => {
    try {
         const response = await searchUsers(data)
         if (response.data.success) {
              if (response.data.users.length >= 1) {
                 dispatch(AdminUsersFetchSuccess(response.data.users));
                 } else {
                 dispatch(getUsers());
                 throw new Error("No users Found");
                 }
            } else {
                throw new Error(response.data.message);
            }
        } catch (err) {
           toast.error(err.message)
        }
     }





    const onSubmit = async (data) => {
      try {
         const response = await RegisterUser(data)
         if (response.success) {
          toast.success(response.message);
          dispatch(getUsers());
          // buttonRef.current.click();
          reset();
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        toast.error(err.message);
        reset();
      }
    }




    useEffect(() => {
      if (localStorage.getItem('admintoken')) {
        setAdmin(JSON.parse(localStorage.getItem('admin')));
      } else {
        toast.error("please login to continue");
        navigete('/admin/login');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



  const handleDeleteUser = async (user) => {
    try {
      const response = await deleteUser(user._id);
      if (response.data.success) {
        toast.error(response.data.message);
        dispatch(getUsers());
        navigete('/admin')
      } else {
        throw new Error("user not deleted !!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  }




  let users = useSelector(value => value.adminUsers.adminUsers);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);


  const handlemodal = () => {
    setmodal(false);

  }


  const handleEditUser = (user) => {
    setItem(user);
    setShowEditModal(true)
  }




  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/css/bootstrap.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/js/bootstrap.min.js"></script>
      </Helmet>
      <div style={{ backgroundColor: "#d3d2d9", height: '100px', marginBottom: '1rem', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
          <div>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Admin Management</span>
          </div>
          <div>
            <button onClick={() => {
              localStorage.removeItem('admintoken');
              localStorage.removeItem('admin');
              navigete('/admin/login');
            }} type="button" className="btn btn-primary" style={{ cursor: 'pointer', backgroundColor: 'black', color: 'white' }}>{Admin.name} <FaChevronRight /> Logout</button>
          </div>
        </div>
      </div>


      <div>
        <section className="container " style={{ overflowX: 'hidden' }}>
          <div className="">
            <div className='d-flex justify-content-center'>
              <h1 className="mt-3 fw-bold border-bottom" style={{ color: "#d3d2d9" }}>Manage Users</h1>
            </div>
            <button style={{ marginLeft: "2%", backgroundColor: "#d3d2d9", borderRadius: '5px', cursor: 'pointer' }} type="button" onClick={() => { setmodal(true) }} data-toggle="modal" data-target="#createModal" className="btn btn-lg btn-primary mt-2 d-flex ms-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">Add User</button>
            {/* search */}
            {/* search */}
            <form onSubmit={handleSubmit2(onSearchSubmit)} >
              <div className='d-flex'>
                <div className="input-group w-25">
                  <input type="text" className="form-control me-2 position-relative rounded-3" {...register2("searchInput", { required: true })} style={{ backgroundColor: '#f2f2f2', border: 'none' }} placeholder="Search" />
                  <i className="ri-search-line position-absolute top-0 end-0 mt-1 text-muted me-3"></i>
                </div>
                <button type='submit' className='btn btn-primary'>search</button>
              </div>
              {errors2.searchInput && <p className='validationColor' style={{ color: 'red' }}>Enter something to search</p>}
            </form>
            {/* serch end */}
            {/* hhhh */}
            {
              modal && <div className="modal fade" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                      <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close">x</button>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className="modal-body">
                        <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlInput1">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" {...register("name", { required: true })} placeholder="name" />
                          {errors.name && <span style={{ color: 'red' }}>This field is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlInput1">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" {...register("email", { required: true })} placeholder="name@example.com" />
                          {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} type="number" placeholder="mobile" />
                          {errors.mobile && <span style={{ color: 'red' }}>This field is required and must be a 10-digit number</span>}
                        </Form.Group>
                        <Form.Group className="mb-3 mx-4" style={{ width: '80%' }} controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" {...register("password", { required: true, minLength: 8 })} placeholder="password" />
                          {errors.password && <span style={{ color: 'red' }}>This field is required and must be at least 8 characters long</span>}
                        </Form.Group>
                      </div>
                      <div className="modal-footer">
                        <Button type="button" onClick={handlemodal} className="btn btn-secondary" data-dismiss="modal">Cancel</Button>
                        <Button type='submit' className="btn btn-primary">Add User</Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            }
            {/* hjghj */}
          </div>
          {/* users table */}
          <div className="text-center mt-5">
            <div className="row table-responsive col-lg-12 " style={{ width: '100%', backgroundColor: 'black', color: 'white' }} >
              <table className="table table-bordered table-striped table-hover " style={{ width: '100%',color: 'white' }} id="productsTable">
                <thead>
                  <tr>
                    <th >Name</th>
                    <th >Email</th>
                    <th >Mobile</th>
                    <th >Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users && users.map((user) => {
                      return (<tr>
                        <th >{user.name}</th>
                        <th >{user.email}</th>
                        <th >{user.mobile}</th>
                        <th >
                          <button><i style={{ cursor: 'pointer', fontSize: 'larger', fontWeight: 'bolder', color: 'blue' }} onClick={() => {
                            handleEditUser(user)
                          }}  >edit</i></button>
                          <button ><i style={{ cursor: 'pointer', fontSize: 'larger', fontWeight: 'bolder', color: 'red'}} onClick={() => { handleDeleteUser(user) }}  >delete</i></button>
                        </th>
                      </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </section >
      </div >
      <div>
      </div>
      {showEditModal &&<UserEditModal user={selectedItem} modalVisibilty={setShowEditModal}/>}
      <ToastContainer />
    </>
  )
}

export default UserView
