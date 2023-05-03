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

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Cadastro de funcionário</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        error
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose} startIcon={<AddIcon />} variant='outlined'>Adicionar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EmployeeRegister