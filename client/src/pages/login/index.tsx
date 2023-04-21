import React, { useEffect, useState } from "react"
import businessTravel from '../../assets/business_travel.avif'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/authContext";
import { AuthenticatedUser } from "../../types/types";
import apiClient from "../../services/api";
import {useMutation} from 'react-query'

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const [id, setId] = useState<number | null>(null);
    // const [name_user, setNameUser] = useState<string | null>(null);
    // const [token, setToken] = useState<string | null>(null);

  
    // const {data, isFetching} = useQuery('id', async() => {
    //     const response = await apiClient.get('empresa/1')
        
    //     return response.data;
    // })

    const mutation = useMutation((auth: {email: String, senha:String}) => {
        return apiClient.post('/auth', auth)
        .then(response => {
            console.log(response.data?.usuario?.id)
            console.log(response.data?.usuario?.nome)
            console.log(response.data?.token)
        })
        .catch(error => {
            console.error(error)
        })
      })
    
      
      const handleSubmit = async (e: any) => {
          e.preventDefault();
          
          mutation.mutate({ email:email, senha: password })
      


        try {
            const added_time = 5 * 1000
            // const { user, token } = await signIn(email, password);




            var userTeste: AuthenticatedUser = {
                email: "bil@email.com",
                id: 1,
                name: 'teste',
                token: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkiLCJzdWIiOiIyIiwiaWF0IjoxNjgyMTE1OTcwLCJleHAiOjE2ODIyMDIzNzB9.8B0U5spBdEfICQhp0i7UFmn0J514-25HmAe3v9_smqk',
                expires: Date.now() + added_time
            }

            console.log(userTeste)

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
                    <div id="email" className="flex flex-col text-gray-300 py-2">
                        <label htmlFor="">E-mail</label>
                        <input onChange={e => setEmail(e.target.value)} className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
                    </div>
                    <div id="password" className="flex flex-col text-gray-300 py-2">
                        <label htmlFor="">Senha</label>
                        <input onChange={e => setPassword(e.target.value)}className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
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