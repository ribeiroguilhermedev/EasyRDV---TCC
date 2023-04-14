import React from  "react"
import businessTravel from '../../assets/business_travel.avif'

const Login = () => {
    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="hidden sm:block">
            <img className="w-full h-full object-cover" src={businessTravel} alt="" />
        </div>

        <div className="bg-blue-post flex flex-col justify-center">
            <form className="max-w-[400px] w-full mx-auto bg-gray-700 p-8 px-8 rounded-lg">
                <h2 className="text-4xl text-white font-bold text-center">LOGIN</h2>
                <div className="flex flex-col text-gray-300 py-2">
                    <label htmlFor="">Usuário</label>
                    <input className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" />
                </div>
                <div className="flex flex-col text-gray-300 py-2">
                    <label htmlFor="">Senha</label>
                    <input className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
                </div>
                <div className="flex justify-between text-gray-300 py-2">
                    <p className="flex items-center"><input type="checkbox" className="mr-2" /> Lembrar</p>
                    <p>Esqueci minha senha</p>
                </div>
                <button className="w-full my-5 py-2 bg-dark-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">Login</button>

            </form>
        </div>

    </div>
    
    
    
    )
}

export default Login