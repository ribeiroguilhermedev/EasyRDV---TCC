import React from "react"
import { useAuth } from "../../auth/authContext"
import { useLocation } from 'react-router-dom';
import EmployeeRegister from "../../components/dialogs/employeeRegister";

const Home = () => {
  const auth = useAuth()
  const location = useLocation();

  return (
    <>
      <div>
        {location.state?.currentUser && (
          <h1>Bem-vindo, {location.state.currentUser?.name}!</h1>
        )}
      </div>
      <button onClick={e => {
        auth.logout()
      }}>logout</button>

      <EmployeeRegister open={true} />
    </>
  )
}

export default Home