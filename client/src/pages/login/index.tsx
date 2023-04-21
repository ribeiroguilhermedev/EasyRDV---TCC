import React, { useEffect, useState } from "react"
import businessTravel from '../../assets/business_travel.avif'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/authContext";
import { AuthenticatedUser } from "../../types/types";
import {useQuery} from 'react-query'
import axios from "axios";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState('');

  
    const {data, isFetching} = useQuery('repos', async() => {
        const response = await axios.get('https://api.github.com/users/FelipeVidalG/repos')
        
        return response.data;
    })
    

  

 

   
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        data.map((e: any)=>{
            console.log(e.full_name);
            
        })
        try {
            const added_time = 5 * 1000
            // const { user, token } = await signIn(email, password);
            var userTeste: AuthenticatedUser = {
                email,
                id: 1,
                name: "nome",
                token: 'sdfhsihfsdhfo87ry8yt8e7tiye78ergoi',
                expires: Date.now() + added_time
            }

            

            login(userTeste);
            navigate('/home');
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" src={businessTravel} alt="" />
            </div>

            <div className="bg-blue-post flex flex-col justify-center">
                <form className="max-w-[400px] w-full mx-auto bg-gray-700 p-8 px-8 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="text-4xl text-white font-bold text-center">LOGIN</h2>
                    <div className="flex flex-col text-gray-300 py-2">
                        <label htmlFor="">E-mail</label>
                        <input onChange={e => setEmail(e.target.value)} className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
                    </div>
                    <div className="flex flex-col text-gray-300 py-2">
                        <label htmlFor="">Senha</label>
                        <input className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
                    </div>
                    <div className="flex justify-between text-gray-300 py-2">
                        <p className="flex items-center"><input type="checkbox" className="mr-2" /> Lembrar</p>
                        <p>Esqueci minha senha</p>
                    </div>
                    <button className="w-full my-5 py-2 text-blue-post bg-dark-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 font-semibold rounded-lg">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login