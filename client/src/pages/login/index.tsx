import React, { useEffect, useState } from "react"
import businessTravel from '../../assets/business_travel.avif'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/authContext";
import { AuthenticatedUser } from "../../types/types";
import apiClient from "../../services/api";
import {useMutation} from 'react-query'
import { number } from "prop-types";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [id, setId] = useState<number | null>(null);
    const [name_user, setNameUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [userTeste, setUserTeste] = useState<AuthenticatedUser | null>(null);

  
    // const {data, isFetching} = useQuery('id', async() => {
    //     const response = await apiClient.get('empresa/1')
        
    //     return response.data;
    // })

    const mutation = useMutation(async(auth: {email: String, senha:String })  => {
        return await apiClient.post('/auth', auth)
        .then(response => {
            const data = {
                id: response.data?.usuario?.id,
                nameUser: response.data?.usuario?.nome,
                token: response.data?.token
            };
            // setId(response.data?.usuario?.id)
            // setNameUser(response.data?.usuario?.nome)
            // setToken(response.data?.token)
            // setEmail(response.data?.email)

            const added_time = 10 * 1000

            setUserTeste(
                {email,
                id: response.data?.usuario?.id,
                name: response.data?.usuario?.nome,
                token: response.data?.token,
                expires: Date.now() + added_time}
                )

            
            var userTeste: AuthenticatedUser = {
                email,
                id: response.data?.usuario?.id,
                name: response.data?.usuario?.nome,
                token: response.data?.token,
                expires: Date.now() + added_time
            }


            console.log(userTeste)

            login(userTeste);  

            return data
        })
        .catch(error => {
            console.error(error)
            alert('E-mail ou senha incorretos')
        })
    });
    
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        await mutation.mutateAsync({ email: email, senha: password })
    
    };

    useEffect(() => {
        if (userTeste != null) {
            
          navigate('/home', { state: { userTeste } });
        }
      }, [userTeste]);

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