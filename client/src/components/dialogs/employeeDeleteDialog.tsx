import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EmployeeDeleteDialoProps } from '../../types/types';
import apiClient from '../../services/api';
import { useMutation } from 'react-query';
import { useAuth } from '../../auth/authContext';


export default function EmployeeDeleteDialog({ nome, email, id, data_criacao, sobrenome, onDeletedUser, users }: EmployeeDeleteDialoProps) {
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useAuth();
  const token = currentUser?.token;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEmployee = useMutation((id: number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return apiClient.delete(`usuario/cadastro/${id}`, config).then(() => {
      const arrCurrentUsers = users.filter(p => p.id !== id)
      onDeletedUser(arrCurrentUsers)

      handleClose()
    });
  })

  const inactivateEmployee = useMutation((id: number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return apiClient.delete(`usuario/cadastro/${id}`, config).then(() => {
      handleClose()
    });
  })


  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Você deseja remover este funcionário?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nome: {nome + sobrenome}. <br />
            Email: {email} <br />
            Data de criação: {String(data_criacao)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color="warning" onClick={() => deleteEmployee.mutate(id)} autoFocus>Inativar</Button>
          <Button color="error" onClick={() => inactivateEmployee.mutate(id)} autoFocus>Remover</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}