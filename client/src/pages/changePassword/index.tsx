import { useState } from "react"
import { useMutation } from 'react-query'
import apiClient from "../../services/api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [idUser, setIdUser] = useState<number | null>(null);
  const navigate = useNavigate();

  const currentUrl = window.location.href
  const guidUser = currentUrl.substring('http://localhost:5173/forgotPassword/change?guid='.length)

  apiClient.get(`/usuario/guid/${guidUser}`)
    .then((response) => {
      setIdUser(Number(response.data.id));
    })
    .catch(error => {
      navigate("/")
    })

  const mutation = useMutation(
    async (id: number | null) => {
      const objPassword = { senha: password }
      return await apiClient.put(`/usuario/atualiza/senha/${id}`, objPassword)
        .then(() => {
          alert('Senha alterada!')
        })
        .catch(error => {
          console.error(error)
          alert('Erro na alteração de senha!')
        })
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,}$/;

  if (!passwordRegex.test(password)) {
    alert("A senha deve ter 8 caracteres, pelo menos 1 número, 1 caractere especial e letras maiúscula e minúscula.");
    return;
  }

  if (password !== passwordConfirm) {
    alert("A senha e a confirmação de senha não correspondem.");
    return;
  }
    await mutation.mutateAsync(idUser)

  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={businessTravel} alt="" />
      </div>

      <div className="bg-blue-post flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-gray-700 p-8 px-8 rounded-lg" onSubmit={handleSubmit}>
          <h2 className="text-4xl text-white font-bold text-center">Alterar senha</h2>
          <div id="email" className="flex flex-col text-gray-300 py-2">
            <label htmlFor="">Nova senha</label>
            <input onChange={e => setPassword(e.target.value)} className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
          </div>
          <div id="password" className="flex flex-col text-gray-300 py-2">
            <label htmlFor="">Confirme a senha</label>
            <input onChange={e => setPasswordConfirm(e.target.value)} className="rounded-lg bg-gray-500 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" />
          </div>
          <button className="w-full my-5 py-2 text-blue-post bg-dark-blue shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 font-semibold rounded-lg">
            Alterar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword