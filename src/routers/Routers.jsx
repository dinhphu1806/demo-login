import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from '../pages/About'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Product from '../pages/Product'
import Register from '../pages/Register'


const Routers = () => {
  return (
    <Routes>
        <Route index exact path='/' element={ <Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routers