import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../types/types';
import apiClient from '../../services/api';
import { useMutation, useQuery } from 'react-query';
import { useAuth } from '../../auth/authContext';
import { useQueryClient } from 'react-query';


export default function EmployeeDeleteDialog({ nome, email, sobrenome, data_criacao, id }: User) {
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useAuth();
  const token = currentUser?.token;
  const queryClient = useQueryClient();
  const [deleted, setDeleted] = React.useState(1)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEmployee = useMutation((id: Number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return apiClient.delete(`http://localhost:8080/usuario/cadastro/${id}`, config).then(() => {
      setDeleted(deleted + 1)
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
          {/* <Button onClick={handleClose} autoFocus>
            Inativar
          </Button> */}
          <Button onClick={() => deleteEmployee.mutate(id)} autoFocus>Remover</Button>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}