import React from 'react'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import AdminLogin from './pages/admin/adminLogin.js/adminLogin'
import UserView from './pages/admin/userView'
import "./App.css"



function App() {
  return (
    <div>
      <Router>
         <Routes>
            <Route  exact path='/' element={<Home/>} />
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route exact path='/profile' element={<Profile/>}/>
            <Route exact path='/admin' element={<UserView/>}/>
            <Route exact path='/admin/login' element={<AdminLogin/>}/>
         </Routes>
      </Router>
      
    </div>
  )
}

export default App
