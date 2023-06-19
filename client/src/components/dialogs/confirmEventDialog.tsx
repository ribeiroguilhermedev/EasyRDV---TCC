import { ConfirmEventProps, approveTripBody, reproveTripBody } from '../../types';
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


export default function ConfirmEventDialog({ isOpen, setOpen, trip, textReversalDisabled, approved, value }: ConfirmEventProps) {
  const { currentUser } = useAuth();
  const token = currentUser?.token;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);

  const approveMutation = useMutation(
    async (approveTripBody: approveTripBody) => {
        return await apiClient.post('/viagem/aprovar', approveTripBody)
    }
);

const reproveMutation = useMutation(
  async (reproveTripBody: reproveTripBody) => {
      return await apiClient.post('/viagem/reprovar', reproveTripBody)
  }
);


  const handleClose = () => {
    setOpen(false);
  };

let schema = yup.object({
  observacao: yup.string().min(3).required(),
}).required();

interface ApproveData {
  observacao: string;
}

const handleApprove = async (data: Object) => {
  setOpen(false)  
  if (!trip) {
    // Colocar toast de erro.
    return
  }

  const {observacao} = data as ApproveData

  const approveTripBody = {
    id: trip.id, 
    fullValue: textReversalDisabled, 
    value, 
    description: observacao
  }

  
  const response = await approveMutation.mutateAsync(approveTripBody)
  console.log(response.data);
  
}

const handleReprove = async (data: Object) => {
  setOpen(false)  
  if (!trip) {
    // Colocar toast de erro.
    return
  }

  const {observacao} = data as ApproveData

  const reproveTripBody = {
    id: trip.id, 
    description: observacao
  }

  console.log(reproveTripBody);
  
  const response = await reproveMutation.mutateAsync(reproveTripBody)
  console.log(response.data);
  
}



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
        {approved ? <GreenButton onClick={handleSubmit(handleApprove)}>Aprovar</GreenButton> : <RedButton onClick={handleSubmit(handleReprove)}>Reprovar</RedButton>}
      </DialogActions>
    </Dialog>
  );
}