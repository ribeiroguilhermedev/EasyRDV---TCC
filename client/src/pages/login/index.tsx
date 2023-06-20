import { useLayoutEffect, useState } from "react"
import { useMutation } from 'react-query'
import { useAuth } from "../../auth/authContext";
import { AuthenticatedUser } from "../../types";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../services/api";
import * as Components from './components';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, FilledInput, Stack, TextField, Typography, useTheme } from "@mui/material";
import { LoginButton, ScheduleGhostButton } from "../../componentStyles/Buttons";
import Logo from '../../assets/LogoComTituloSemFundo_Branco.png'

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

    const [signIn, toggle] = useState(true);
    const theme = useTheme();

    console.log(theme);

    let SignInContainerStyle: React.CSSProperties = {
        backgroundColor: theme.palette.grey[300],
        transition: 'all 0.6s ease-in-out',
        borderRight: `6px solid ${theme.palette.background.default}`
    }
    if (!signIn) {
        SignInContainerStyle.transform = 'translateX(100%)'
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundColor: theme.palette.background.default }}>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <Components.Input type='text' placeholder='Name' />
                        <Components.Input type='email' placeholder='Email' />
                        <Components.Input type='password' placeholder='Password' />
                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Container className="h-full" style={SignInContainerStyle}>
                        <Components.Form>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: '#fff' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography className="text-primary-color" textAlign="center" variant="h5" fontWeight='bold'>Já tem cadastro?</Typography>
                            <Stack spacing={2} className="w-full mt-7">
                                <FilledInput sx={{ color: theme => theme.palette.secondary.main }} color="secondary" fullWidth placeholder="E-mail" />
                                <FilledInput sx={{ color: theme => theme.palette.secondary.main }} color="secondary" type="password" fullWidth placeholder="Senha" />
                                <Components.Anchor href='#'>Esqueceu sua senha?</Components.Anchor>
                                <LoginButton>Entrar</LoginButton>
                            </Stack>
                        </Components.Form>
                    </Container>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome Back!</Components.Title>
                            <Components.Paragraph>
                                To keep connected with us please login with your personal info
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Image className='mb-7' src={Logo} />
                            <div className="flex flex-col items-center justify-center">
                                <Components.Title>Quer conhecer o sistema EasyRDV?</Components.Title>
                                <Components.Paragraph>
                                    Preencha o formulário para agendar uma demonstração
                                </Components.Paragraph>
                                <ScheduleGhostButton onClick={() => toggle(false)}>
                                    Agendar
                                </ScheduleGhostButton>
                            </div>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    )

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