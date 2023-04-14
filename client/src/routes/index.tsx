import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'



const router = createBrowserRouter(createRoutesFromElements(
        <Route>
          <Route index element={<Login/>} />
          <Route path='/teste' element={'Teste'} />
          {/* <Route path="/home" element={<Private Item={Home} />} /> */}
          <Route path='*' element={<Login/>} />
        </Route>
))

export default router