import React, { PropsWithChildren, useLayoutEffect, useState } from "react"
import { useMutation } from 'react-query'
import { useAuth } from "../../auth/authContext";
import { AuthenticatedUser } from "../../types";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../services/api";
import * as Components from './components';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Button, Container, FilledInput, Stack, Checkbox, Typography, useTheme, FormControlLabel, FilledInputProps, InputAdornment } from "@mui/material";
import { LoginButton, ScheduleGhostButton } from "../../componentStyles/Buttons";
import Logo from '../../assets/LogoComTituloSemFundo_Branco.png'
import PresentToAllIcon from '@mui/icons-material/PresentToAllOutlined';
import {Email, Password, Badge, Business, Link, WhatsApp} from '@mui/icons-material';
import { ErrorToast } from "../../componentStyles/Toasts";

export default function Login(): JSX.Element {
    const navigate = useNavigate();

    const { login } = useAuth();

    const theme = useTheme();

    const [signIn, toggle] = useState(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);

    useLayoutEffect(() => {
        if (currentUser) navigate('/home', { state: { currentUser } });
    }, [currentUser]);


    const mutation = useMutation(
        async (auth: { email: String, senha: String }) => {
            console.log(auth);

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
                    ErrorToast('E-mail ou senha incorretos')
                })
        }
    );

    let SignInContainerStyle = getSignInContainerStyle()
    let SignUpContainerStyle = getSignUpContainerStyle()

    return (
        <div className="h-screen flex flex-col justify-center items-center" style={{ backgroundColor: theme.palette.background.default }}>
            <Components.Container>
                <Components.SignUpContainer signinIn={signIn}>
                    <Container className="h-full" style={SignUpContainerStyle}>
                        <Components.Form>
                            <InternalAvatar>
                                <PresentToAllIcon />
                            </InternalAvatar>
                            <InternalTypography>
                                Agende uma demonstração
                            </InternalTypography>
                            <Stack spacing={2} className="w-full mt-7">
                                <InternalFilledInput startAdornment={<Email className="mt-4 mr-2"/>} placeholder="E-mail" />
                                <InternalFilledInput startAdornment={<Badge className="mt-4 mr-2"/>} placeholder="Nome" />
                                <InternalFilledInput startAdornment={<Business className="mt-4 mr-2"/>} placeholder="Nome da empresa" />
                                <InternalFilledInput startAdornment={<Link className="mt-4 mr-2"/>} placeholder="Site da empresa" />
                                <InternalFilledInput startAdornment={<WhatsApp className="mt-4 mr-2"/>} placeholder="WhatsApp" />
                                <FormControlLabel
                                    sx={{ color: theme.palette.secondary.main }}
                                    label="Quero receber novidades do EasyRDV"
                                    control={
                                        <Checkbox sx={{
                                            color: theme.palette.secondary.main,
                                            '&.Mui-checked': {
                                                color: theme.palette.primary.main,
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
                            <InternalAvatar>
                                <LockOutlinedIcon />
                            </InternalAvatar>
                            <InternalTypography>
                                Já tem cadastro?
                            </InternalTypography>
                            <Stack spacing={2} className="w-full mt-7">
                                <InternalFilledInput
                                    startAdornment={<Email className="mt-4 mr-2" />}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="E-mail" />
                                <InternalFilledInput
                                    startAdornment={<Password className="mt-4 mr-2" />}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                    placeholder="Senha" />
                                <Components.Anchor className="cursor-pointer" onClick={handleForgetPasswordClick}>Esqueceu sua senha?</Components.Anchor>
                                <LoginButton onClick={handleSubmit}>Entrar</LoginButton>
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
                            <Components.Title >Ainda não conhece o sistema EasyRDV?</Components.Title>
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
    )

    function handleForgetPasswordClick() {
        navigate('/forgotPassword')
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        await mutation.mutateAsync({ email: email, senha: password });
    }

    function getSignInContainerStyle(): React.CSSProperties {
        let cssProps: React.CSSProperties = {
            backgroundColor: theme.palette.grey[200],
            transition: 'all 0.4s ease-in-out',
            borderRight: `6px solid ${theme.palette.background.default}`
        }
        if (!signIn) {
            cssProps.transform = 'translateX(100%)'
        }

        return cssProps
    }

    function getSignUpContainerStyle(): React.CSSProperties {
        return {
            backgroundColor: theme.palette.grey[200],
            transition: 'all 0.4s ease-in-out',
        }
    }
}


function InternalFilledInput({ value, placeholder, type, startAdornment, onChange }: FilledInputProps) {
    return <FilledInput
        sx={{ color: theme => theme.palette.secondary.main }}
        color="secondary"
        fullWidth
        value={value}
        startAdornment={startAdornment}
        placeholder={placeholder}
        onChange={onChange}
        type={type} />
}

function InternalTypography({ children }: PropsWithChildren) {
    return (
        <Typography
            sx={{ color: theme => theme.palette.secondary.main }}
            className="text-primary-color"
            textAlign="center"
            variant="h5"
            fontWeight='bold'
        >
            {children}
        </Typography>
    )
}

function InternalAvatar({ children }: PropsWithChildren) {
    return (
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', color: '#fff' }}>
            {children}
        </Avatar>
    )
}