import { useState } from "react"
import { useMutation } from 'react-query'
import businessTravel from '../../assets/business_travel.avif'
import apiClient from "../../services/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');

    const mutation = useMutation(
        async (email: String) => {
            const objEmail = {email}
            return await apiClient.post('/usuario/recuperar/senha', objEmail)
                .then(() => {
                  alert('Email enviado!')
                })
                .catch(error => {
                    console.error(error)
                    alert('Erro no envio de e-mail!')
                })
        }
    );

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await mutation.mutateAsync(email)
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" src={businessTravel} alt="" />
            </div>

            <div className="bg-blue-post flex flex-col justify-center">
                <form className="max-w-[400px] w-full mx-auto bg-gray-700 p-8 px-8 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="text-3xl text-white font-bold text-center">Recuperar senha</h2>
                    <div id="email" className="flex flex-col text-gray-300 py-2">
                        <label htmlFor="">E-mail</label>
                        <input onChange={e => setEmail(e.target.value)} className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
                    </div>
                    <button className="w-full my-5 py-2 text-blue-post bg-dark-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 font-semibold rounded-lg">
                        Enviar link para redefinição
                    </button>
                    <div className="flex justify-center text-gray-300 py-2">
                        <a href="/">Voltar para login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword