import React,{useEffect,useState} from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {Link,useNavigate} from "react-router-dom"
import {useDispatch,useSelector } from 'react-redux';
import {GetCurrentUser} from '../../apicalls/users'
import "./navbar.css"
import { usersFetchFailure, usersFetchSuccess } from '../../redux/users/usersAction';



function Navbar() {
  const user = useSelector(value => value.users.users);
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
    const [Active,setActive]=useState("nav__menu")
    const [toggleicon,settoggleicon]=useState("nav__toggler")
    const navToggle=()=>{
        Active==="nav__menu"?setActive("nav__menu nav__active"):setActive("nav__menu")
        toggleicon==="nav__toggler"? settoggleicon("nav__toggler toggle"):settoggleicon("nav__toggler")
    };



    const validateToken =  async() => {
      try {
        const response=await GetCurrentUser();
          if(response.success){
             dispatch(usersFetchSuccess(response.data))
          }else{
             dispatch(usersFetchFailure(response.message))
             throw new Error(response.message)
          }
      } catch (err) {
          console.log(err);
          dispatch(usersFetchFailure());
            toast.error(err.message);
            navigate('/login');
      } 
    }



    useEffect(()=>{
      if(localStorage.getItem('token')) validateToken();
      else{
        toast.error("please login to continue");
            navigate('/login');
      }
    },[])


    const logout=()=>{
      localStorage.removeItem('token');
      navigate('/login');
    }


    
  return (
   <nav className="nav">
   <Link to={'/'} className="nav__brand">USER DASHBOARD</Link>
   <ul className={Active}>
    <li className="nav__item">< Link to={'/'} className="nav__linkl">Home</Link></li>
    {/* <li className="nav__item"><Link to={'#'} className="nav__linkl">{user.name}</Link></li> */}
    <li className="nav__item"><Link to={'/profile'} className="nav__linkl">{user.name}</Link></li>
    {/* <li className="nav__item "><button  className="nav__linkl HII">user</button></li> */}
    <li className="nav__item"><Link onClick={logout} className="nav__linkl">Logout</Link></li>
   </ul>
   <div onClick={navToggle} className={toggleicon}>
    <div className="line1"></div>
    <div className="line2"></div>
    <div className="line3"></div>
   </div>
   </nav>

  )
  }

export default Navbar
