import { useLayoutEffect, useState } from "react"
import { useMutation } from 'react-query'
import { useAuth } from "../../auth/authContext";
import { AuthenticatedUser } from "../../types/types";
import { useNavigate } from 'react-router-dom';
import businessTravel from '../../assets/business_travel.png'
import apiClient from "../../services/api";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

    const mutation = useMutation(
        async (auth: { email: String, senha: String }) => {
            return await apiClient.post('/auth', auth)
                .then(response => {
                    var user: AuthenticatedUser = {
                        email,
                        id: response.data?.usuario?.id,
                        nome: response.data?.usuario?.nome,
                        sobrenome: response.data?.usuario?.sobrenome,
                        cpf: response.data?.usuario?.cpf,
                        rg: response.data?.usuario?.rg,
                        data_nascimento: response.data?.usuario?.data_nascimento,
                        token: response.data?.token,
                        empresa_id: response.data?.usuario?.empresa_id,
                        guid: response.data?.guid,
                        observacao: response.data?.observacao,
                        data_criacao: response.data?.data_criacao,
                        flag_ativo: response.data?.flag_ativo,
                        foto: response.data?.foto,
                    }
                    setCurrentUser(user)
                    login(user);
                })
                .catch(error => {
                    console.error(error)
                    alert('E-mail ou senha incorretos')
                })
        }
    );

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await mutation.mutateAsync({ email: email, senha: password })
    };

    useLayoutEffect(() => {
        if (currentUser) navigate('/home', { state: { currentUser } });
    }, [currentUser]);

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
                        <input onChange={e => setPassword(e.target.value)} className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
                    </div>
                    <button className="w-full my-5 py-2 text-blue-post bg-dark-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 font-semibold rounded-lg">
                        Login
                    </button>
                    <div className="flex justify-center text-gray-300 py-2">
                        <a href="/forgotPassword">Esqueci minha senha</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login