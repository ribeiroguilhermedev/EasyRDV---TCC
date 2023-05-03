import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from "../../auth/authContext";
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import  { useForm } from 'react-hook-form'

interface EmployeeRegisterProps {
    open: boolean;
}

const EmployeeRegister = ({ open }: EmployeeRegisterProps) => {
    const { currentUser } = useAuth();

    const [isOpen, setOpen] = useState(open);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {register, handleSubmit, formState: {errors}} = useForm();

    console.log(errors);
    




    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Cadastro de funcionário</DialogTitle>
                <DialogContent className='flex flex-row gap-3' style={{padding: "0px 24px"}}>
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome*"
                        type="text"
                        variant="outlined"
                        {...register("name", {required: 'Preencha o campo obrigatório'})}
                    />
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        id="last_name"
                        label="Sobrenome*"
                        type="text"
                        variant="outlined"
                        {...register("last_name", {required: 'Preencha o campo obrigatório'})}
                    />
                </DialogContent>
                <DialogContent style={{padding: "0px 24px"}}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address*"
                        type="email"
                        fullWidth
                        variant="outlined"
                        {...register("email", {required: 'Preencha o campo obrigatório'})}
                    />
                </DialogContent>
                <DialogContent className='flex flex-row gap-3' style={{padding: "0px 24px"}}>
                    <TextField className='basis-1/3'
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Data de nascimento*"
                        type="date"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("date", {required: 'Preencha o campo obrigatório'})}
                    />
                    <TextField className='basis-1/3'
                        autoFocus
                        margin="dense"
                        id="name"
                        label="RG*"
                        type="text"
                        variant="outlined"
                        {...register("rg", {required: 'Preencha o campo obrigatório'})}
                    />
                    <TextField className='basis-1/3'
                        autoFocus
                        margin="dense"
                        id="name"
                        label="CPF*"
                        type="text"
                        variant="outlined"
                        {...register("cpf", {required: 'Preencha o campo obrigatório'})}
                    />
                </DialogContent>
                <DialogContent style={{padding: "0px 24px"}}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Observação"
                        margin='dense'
                        multiline
                        fullWidth
                        rows={4}
                        placeholder="Digite uma observação sobre o funcionário se necessário."
                        {...register("obs")}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit((data) => 
                        {  
                        console.log(data) 
                        setOpen(false); 
                        })} 
                        startIcon={<AddIcon />} variant='outlined'>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EmployeeRegister