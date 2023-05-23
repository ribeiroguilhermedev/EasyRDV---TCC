import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom'
import Login from '../pages/login'
import Home from '../pages/home'
import PrivateRoute from './privateRoute'
import ForgotPassword from '../pages/forgotPassword'



const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<Login />} />
    <Route path='forgotPassword' element={<ForgotPassword />} />
    <Route path='/home' element={
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    } />
  </Route>
))

export default router