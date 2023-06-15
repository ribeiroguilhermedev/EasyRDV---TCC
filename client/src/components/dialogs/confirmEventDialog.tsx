import { ConfirmEventProps, EmployeeEditDialogProps, User } from '../../types';
import { useAuth } from '../../auth/authContext';
import { useState } from 'react';
import { useMediaQuery, TextField, DialogContentText, Button } from '@mui/material';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { GreenButton, RedButton } from '../../componentStyles/Buttons';
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiClient from '../../services/api';
import * as yup from "yup";
import CloseDialog from '../muiComponents/closeDialog';


export default function ConfirmEventDialog({ isOpen, setOpen, approved }: ConfirmEventProps) {
  const { currentUser } = useAuth();
  const token = currentUser?.token;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => { };

  const handleClose = () => {
    setOpen(false);
  };

let schema = yup.object({
  observacao: yup.string().min(3).required(),
}).required();




  const handleSubmitInternal = async (data: Object) => {


    setLoading(true)



    setOpen(false)
    setLoading(false)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });



  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {approved ? <CloseDialog handleClose={handleClose} title='Aprovação'/> : <CloseDialog handleClose={handleClose} title='Reprovação'/>}
      <DialogContent>
        <TextField
          id="observacao"
          sx={{width: '30rem'}}
          multiline
          rows={4}
          {...register("observacao")}
        />
      </DialogContent>
      <DialogActions>
        {approved ? <GreenButton>Aprovar</GreenButton> : <RedButton>Reprovar</RedButton>}
      </DialogActions>
    </Dialog>
  );
}