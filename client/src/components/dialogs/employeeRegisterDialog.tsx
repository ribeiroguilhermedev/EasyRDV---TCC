import { useAuth } from "../../auth/authContext";
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup';
import { User, EmployeeRegisterProps } from "../../types/types";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import apiClient from "../../services/api";
import * as yup from "yup";
import InputMask from 'react-input-mask';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ErrorButton } from "../../styles/Buttons";
import { DatePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";

const EmployeeRegisterDialog = ({ open, onClose }: EmployeeRegisterProps) => {
    const { currentUser } = useAuth();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [cpfValidationFailed, setCpfValidationFailed] = useState(false);
    const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
    const [rgValidationFailed, setRGValidationFailed] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const cpfRef = useRef<HTMLInputElement>(null);
    const rgRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const handleClose = () => {
        onClose()
        setOpen(false);
    };

    const handleChangeDate = (value: any) => {
        console.log(value.$d);
        console.log(value.$d);
    };

    const mutation = useMutation(
        async (user: User) => {
            return await apiClient.post('/usuario/cadastro/funcionario', user)
        }
    );

    const schema = yup.object({
        nome: yup.string().required(),
        sobrenome: yup.string().required(),
        cpf: yup.string(),
        rg: yup.string(),
        data_nascimento: yup.date().max(new Date(), 'Não é possível incluir uma data futura').required(),
        email: yup.string().email('Precisa ser um email válido').required(),
    }).required();

    const ValidateCPF_RG: () => boolean = () => {
        const cpf = cpfRef.current?.value.replace(/\D/g, "")

        let valid = true;

        if (cpf?.length !== 11) {
            setCpfValidationFailed(true)
            valid = false
        }

        const rg = rgRef.current?.value.replace(/\D/g, "")
        if (rg?.length !== 9) {
            setRGValidationFailed(true)
            valid = false
        }
        return valid;
    };

    const handleSubmitInternal = async (data: Object) => {
        if (!ValidateCPF_RG()) return

        setLoading(true)

        const user = data as User
        user.senha = '123'
        user.empresa_id = 1
        user.cpf = cpfRef.current?.value
        user.rg = rgRef.current?.value

        await mutation.mutateAsync(user)

        onClose()
        setOpen(false)
        setLoading(false)

        reset({
            nome: '',
            sobrenome: '',
            email: '',
            data_nascimento: null,
            observacao: '',
        })
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<User>({
        resolver: yupResolver(schema)
    });

    const hasInputError = Object.keys(errors).length > 0
    const hasRGOrCpfError = cpfValidationFailed || rgValidationFailed

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} fullScreen={fullScreen}>
                <div className='flex justify-between items-center'>
                    <DialogTitle>Cadastro de funcionário</DialogTitle>
                    {hasInputError && !cpfValidationFailed && <p className='pr-6 text-error'>Preencha os campos obrigatórios</p>}
                    {hasRGOrCpfError && !hasInputError && <p className='pr-6 text-error'>Preencha corretamente os campos</p>}
                </div>
                <DialogContent className='flex flex-row gap-3' style={{ padding: "0px 24px" }}>
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Nome*"
                        type="text"
                        variant="outlined"
                        error={!!errors['nome']}
                        {...register("nome", { required: true })}
                    />
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        id="last_name"
                        label="Sobrenome*"
                        type="text"
                        variant="outlined"
                        error={!!errors['sobrenome']}
                        {...register("sobrenome", { required: true })}
                    />
                </DialogContent>
                <DialogContent style={{ padding: "0px 24px" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address*"
                        type="email"
                        fullWidth
                        variant="outlined"
                        error={!!errors['email']}
                        {...register("email", { required: true })}
                    />
                </DialogContent>
                <DialogContent className='flex flex-row gap-3' style={{ padding: "0px 24px" }}>
                    <TextField className='basis-1/3'
                        id="data_nascimento"
                        value={dateValue}
                        error={!!errors['data_nascimento']}
                        {...register("data_nascimento", { required: true })}
                    />
                    <Box>
                        <DatePicker
                            label="Data de nascimento*"
                            onChange={handleChangeDate}
                        />
                    </Box>
                    <InputMask
                        mask="99.999.999-9"
                        disabled={false}
                        className='basis-1/3'
                        autoFocus
                        id="rg"
                        type="text"
                        inputRef={rgRef}
                        onChange={() => setRGValidationFailed(false)}
                    >
                        <TextField
                            margin="dense"
                            label="RG*"
                            variant="outlined"
                            error={rgValidationFailed}
                        />
                    </InputMask>
                    <InputMask
                        mask="999.999.999-99"
                        disabled={false}
                        className='basis-1/3'
                        autoFocus
                        id="cpf"
                        type="text"
                        inputRef={cpfRef}
                        onChange={() => setCpfValidationFailed(false)}
                    >
                        <TextField
                            margin="dense"
                            label="CPF*"
                            variant="outlined"
                            error={cpfValidationFailed}
                        />
                    </InputMask>
                </DialogContent>
                <DialogContent style={{ padding: "0px 24px" }}>
                    <TextField
                        id="observacao"
                        label="Observação"
                        margin='dense'
                        multiline
                        fullWidth
                        rows={4}
                        placeholder="Digite uma observação sobre o funcionário se necessário."
                        {...register("observacao")}
                    />
                </DialogContent>
                <DialogActions className='mr-4'>
                    <ErrorButton onClick={handleClose}>Cancelar</ErrorButton>
                    <LoadingButton
                        onClick={
                            handleSubmit(handleSubmitInternal)
                        }
                        startIcon={<AddIcon />}
                        variant='outlined'
                        loadingPosition="start"
                        loading={loading}
                    >
                        Adicionar
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EmployeeRegisterDialog