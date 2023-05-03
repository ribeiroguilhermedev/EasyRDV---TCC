import { useAuth } from "../../auth/authContext";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import apiClient from "../../services/api";
import { User, EmployeeRegisterProps } from "../../types/types";

const EmployeeRegister = ({ open , onClose}: EmployeeRegisterProps) => {
    const { currentUser } = useAuth();

    const [isOpen, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const handleClose = () => {
        onClose()
        setOpen(false);
    };

    const mutation = useMutation(
        async (user: User) => {
            return await apiClient.post('/usuario/cadastro/funcionario', user)
        }
    );

    const handleSubmitInternal = async (data: Object) => {
        setLoading(true)

        const user = data as User
        user.senha = '123'
        user.empresa_id = 1

        await mutation.mutateAsync(user)

        setOpen(false)
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <div className='flex justify-between items-center'>
                    <DialogTitle>Cadastro de funcionário</DialogTitle>
                    {Object.keys(errors).length > 0 && <p className='pr-6 text-error'>Preencha os campos obrigatórios</p>}
                </div>
                <DialogContent className='flex flex-row gap-3' style={{ padding: "0px 24px" }}>
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome*"
                        type="text"
                        variant="outlined"
                        error={!!errors['name']}
                        {...register("nome", { required: true })}
                    />
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        id="last_name"
                        label="Sobrenome*"
                        type="text"
                        variant="outlined"
                        error={!!errors['last_name']}
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
                        autoFocus
                        margin="dense"
                        id="birth_date"
                        label="Data de nascimento*"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={!!errors['date']}
                        {...register("data_nascimento", { required: true })}
                    />
                    <TextField className='basis-1/3'
                        autoFocus
                        margin="dense"
                        id="rg"
                        label="RG*"
                        type="text"
                        variant="outlined"
                        error={!!errors['rg']}
                        {...register("rg", { required: true })}
                    />
                    <TextField className='basis-1/3'
                        autoFocus
                        margin="dense"
                        id="cpf"
                        label="CPF*"
                        type="text"
                        variant="outlined"
                        error={!!errors['cpf']}
                        {...register("cpf", { required: true })}
                    />
                </DialogContent>
                <DialogContent style={{ padding: "0px 24px" }}>
                    <TextField
                        id="observation"
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
                    <Button color='error' onClick={handleClose}>Cancelar</Button>
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

export default EmployeeRegister