import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { EmployeeDeleteDialoProps, User } from '../../types/types';
import apiClient from '../../services/api';
import { useMutation } from 'react-query';
import { useAuth } from '../../auth/authContext';
import { ErrorButton, WarningButton } from '../../componentStyles/Buttons';


export default function EmployeeDeleteDialog({ nome, email, id, data_criacao, sobrenome, onDeletedUser, users, flag_ativo }: EmployeeDeleteDialoProps) {
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
    return apiClient.delete(`usuario/${id}`, config).then(() => {
      const arrCurrentUsers = users.filter(p => p.id !== id)
      onDeletedUser(arrCurrentUsers)

      handleClose()
    });
  })

  const inactivateEmployee = useMutation((id: number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = { flag_ativo: false };
    return apiClient.put(`usuario/atualiza/flag/${id}`,data, config).then((response) => {
      const userUpdated = response.data  
      const indexOfUser = (users.findIndex((user: User) => user.id === id));
      const arrCurrentUsers = users.filter(p => p.id !== id)
      arrCurrentUsers.splice(indexOfUser,0,userUpdated)
      onDeletedUser(arrCurrentUsers)

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
          <WarningButton onClick={() => inactivateEmployee.mutate(id)} autoFocus>Inativar</WarningButton>
          <ErrorButton onClick={() => deleteEmployee.mutate(id)} autoFocus>Remover</ErrorButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}