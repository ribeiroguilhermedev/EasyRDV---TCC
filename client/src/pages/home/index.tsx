import React from  "react"
import { useAuth } from "../../auth/authContext"

const Home = () => {
    const auth = useAuth()

    return (
        <>
        <div>Home</div>
        <button onClick={e=>{
            auth.logout()
        }}>logout</button>
        </>
    )
}

export default Home