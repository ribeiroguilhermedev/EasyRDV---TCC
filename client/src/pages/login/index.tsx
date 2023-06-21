import { useLayoutEffect, useState } from "react"
import { useMutation } from 'react-query'
import { useAuth } from "../../auth/authContext";
import { AuthenticatedUser } from "../../types";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../services/api";
import * as Components from './components';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, FilledInput, Stack, Checkbox, Typography, useTheme, FormControlLabel, FilledInputProps } from "@mui/material";
import { LoginButton, ScheduleGhostButton } from "../../componentStyles/Buttons";
import Logo from '../../assets/LogoComTituloSemFundo_Branco.png'
import PresentToAllIcon from '@mui/icons-material/PresentToAllOutlined';

export default function Login(): JSX.Element {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

    const mutation = useMutation(
        async (auth: { email: String; senha: String; }) => {
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
                    };
                    setCurrentUser(user);
                    login(user);
                })
                .catch(error => {
                    console.error(error);
                    alert('E-mail ou senha incorretos');
                });
        }
    );

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await mutation.mutateAsync({ email: email, senha: password });
    };

    useLayoutEffect(() => {
        if (currentUser) navigate('/home', { state: { currentUser } });
    }, [currentUser]);

    const [signIn, toggle] = useState(true);
    const theme = useTheme();

    console.log(theme);

    let SignInContainerStyle: React.CSSProperties = {
        backgroundColor: theme.palette.grey[200],
        transition: 'all 0.4s ease-in-out',
        borderRight: `6px solid ${theme.palette.background.default}`
    };
    if (!signIn) {
        SignInContainerStyle.transform = 'translateX(100%)';
    }


    let SignUpContainerStyle: React.CSSProperties = {
        backgroundColor: theme.palette.grey[200],
        transition: 'all 0.4s ease-in-out',
    };


    return (
        <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundColor: theme.palette.background.default }}>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Container className="h-full" style={SignUpContainerStyle}>
                        <Components.Form>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: '#fff' }}>
                                <PresentToAllIcon />
                            </Avatar>
                            <Typography className="text-primary-color" textAlign="center" variant="h5" fontWeight='bold'>
                                Agende uma demonstração
                            </Typography>
                            <Stack spacing={2} className="w-full mt-7">
                                <InternalFilledInput placeholder="E-mail" />
                                <InternalFilledInput placeholder="Nome" />
                                <InternalFilledInput placeholder="Nome da empresa" />
                                <InternalFilledInput placeholder="Site da empresa" />
                                <InternalFilledInput placeholder="WhatsApp" />
                                <FormControlLabel
                                    sx={{ color: theme.palette.secondary.main }}
                                    label="Quero receber novidades do EasyRDV"
                                    control={
                                        <Checkbox sx={{
                                            color: theme.palette.secondary.main,  // altera a cor quando não selecionado
                                            '&.Mui-checked': {
                                                color: theme.palette.primary.main,  // altera a cor quando selecionado (checked)
                                            },
                                        }} />
                                    }
                                />
                                <LoginButton>Agendar</LoginButton>
                            </Stack>
                        </Components.Form>
                    </Container>
                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Container className="h-full" style={SignInContainerStyle}>
                        <Components.Form>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: '#fff' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography className="text-primary-color" textAlign="center" variant="h5" fontWeight='bold'>
                                Já tem cadastro?
                            </Typography>
                            <Stack spacing={2} className="w-full mt-7">
                                <InternalFilledInput placeholder="E-mail" />
                                <InternalFilledInput type="password" placeholder="Senha" />
                                <Components.Anchor style={{ color: theme.palette.secondary.main }}>Esqueceu sua senha?</Components.Anchor>
                                <LoginButton>Entrar</LoginButton>
                            </Stack>
                        </Components.Form>
                    </Container>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn} style={{ borderRight: `6px solid ${theme.palette.background.default}` }}>
                            <Components.Image className='mb-7' src={Logo} />
                            <Components.Title>Já possui cadastro conosco?</Components.Title>
                            <Components.Paragraph>
                                Por favor, faça o login com sua conta pessoal <b>EasyRDV</b>
                            </Components.Paragraph>
                            <ScheduleGhostButton onClick={() => toggle(true)}>
                                Login
                            </ScheduleGhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Image className='mb-7' src={Logo} />
                            <Components.Title>Ainda não conhece o sistema EasyRDV?</Components.Title>
                            <Components.Paragraph>
                                Quer <b>modernizar</b> a forma como sua empresa lida com o reembolso de despesas de viagem?
                                Agende uma demonstração com nosso time!
                            </Components.Paragraph>
                            <Components.SubParagraph>
                                Nosso sistema permite que você gerencie todas as despesas de viagem com facilidade,
                                economizando tempo e reduzindo o esforço.
                            </Components.SubParagraph>
                            <ScheduleGhostButton onClick={() => toggle(false)}>
                                Agendar
                            </ScheduleGhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>
            </Components.Container>
        </div>
    );

    function InternalFilledInput({ placeholder, type }: FilledInputProps) {
        return <FilledInput
            sx={{ color: theme => theme.palette.secondary.main }}
            color="secondary"
            fullWidth
            placeholder={placeholder}
            type={type} />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full overflow-hidden">
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" />
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
    );
}