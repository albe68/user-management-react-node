import React,{useEffect} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './signup.css';
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"
import {RegisterUser} from '../../apicalls/users'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Signup() {
  const navigate=useNavigate()
  const {register, handleSubmit, formState:{errors}, watch,reset} = useForm();
  const submit=async(data)=>{
    try{
      const response= await RegisterUser(data)
      if(response.success){
        toast.success(response.message);
           setTimeout(()=>{
            navigate('/login');
           }, 2000);
      }else{
         throw new Error(response.message);
      }
    }catch(err){
      toast.error(err.message);
            reset();
    }
  }




  useEffect(()=>{
    if(localStorage.getItem('token')){
        navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])




  return (
    <Container>
      <Row>
        <Col lg={6} md={12}>
          <div className="register">
            <div className="col-1">
              <h2>Sign In</h2>
              
              <span style={{ color: 'red' }}>Register User</span>

              <Form onSubmit={handleSubmit(submit)} id="form" className="flex flex-col">
                <Form.Control type="text" {...register("name", {required: true})} placeholder="name" />
                {errors.name && <span style={{color:'red'}}>This field is required</span>}
                <Form.Control type="text" {...register("email", {required: true})}  placeholder="e-mail" />
                {errors.email && <span  style={{color:'red'}}>This field is required</span>}
                <Form.Control type="text"{...register("mobile", {required: true, minLength: 10, maxLength: 10 })}  placeholder="mobile number" />
                {errors.mobile && <span  style={{color:'red'}}>you must be type 10-digit number</span>}
                <Form.Control type="password" {...register("password", {required: true, minLength: 8})} placeholder="password" />
                {errors.password&&<span  style={{color:'red'}}>This fiield required,at least 8 characters </span>}
                <Form.Control type="password" {...register("confirmPassword",{required: true, validate: value => value===watch('password')})}  placeholder="confirm password" />
                {errors.confirmPassword && <span style={{color:'red'}}>Passwords do not match</span>}

                <Button style={{ backgroundColor: 'red', color: 'white' }}   className="btn" variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
              <ToastContainer />
            <p onClick={()=>{navigate('/login')}} className='ps-3 pb-2'>already have an account ? <span style={{color: '#4d79ff', fontWeight: 'bold', cursor: 'pointer'}}>login</span></p>
            </div>
            <div className="col-2">
              <img
                src="https://img.freepik.com/free-photo/portrait-man-wearing-sunglasses_23-2149443756.jpg?w=1060&t=st=1686643110~exp=1686643710~hmac=2b3a56aa040bd1e252fd8767bc8b0f1c3695fc862b22080c7735da01a48f6a51"
                alt=""
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;

