import React from  "react"
import { useAuth } from "../../auth/authContext"
import { useLocation } from 'react-router-dom';

const Home = () => {
    const auth = useAuth()
    const location = useLocation();

    return (
        <>
        <div>
      {location.state?.userTeste && (
        <h1>Bem-vindo, {location.state.userTeste?.name}!</h1>
      )}
    </div>
        <button onClick={e=>{
            auth.logout()
        }}>logout</button>
        </>
    )
}

export default Home