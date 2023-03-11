import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';

export const AppRouutes = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element= {<Login />} />  
                <Route path='/signup' element= {<Signup />} />
                <Route path='/home' element= {<Home />} />                
            </Routes>
        </BrowserRouter>
    )
}