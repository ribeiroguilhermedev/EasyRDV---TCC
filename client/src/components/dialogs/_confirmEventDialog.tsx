import { ConfirmEventProps, ErrorMessage, approveTripBody, reproveTripBody } from '../../types';
import { Checkbox, Stack, TextField } from '@mui/material';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { GreenButton, RedButton } from '../../componentStyles/Buttons';
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import apiClient from '../../services/api';
import * as yup from "yup";
import { ErrorToast, SuccessToast } from '../../componentStyles/Toasts';
import { useCallback, useState } from 'react';
import { toastAxiosError } from '../../utils/format';
import { CloseDialog, TextFieldReversal } from '../muiComponents';

export default function ConfirmEventDialog({ isOpen, setOpen, trip, approved }: ConfirmEventProps): JSX.Element {
  const [value, setValue] = useState<number>(trip.valorTotal);
  const [textReversalDisabled, setTextReversalDisabled] = useState<boolean>(true);

  let schema = getInputSchema(approved);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleCheckReversalDisabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextReversalDisabled(event.target.checked);
  };

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

  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleApprove = useCallback(async (data: any) => {
    if (!trip) {
      ErrorToast('Erro ao executar ação');
      return
    }

    const approveTripBody = {
      id: trip.id,
      fullValue: !textReversalDisabled,
      value:50000,
      description: data.observacao
    }

    try {
      const res = await approveMutation.mutateAsync(approveTripBody)
      console.log(res);
      
      SuccessToast()
      handleClose()
    } catch (error) {
      toastAxiosError(error)
    }
  }, [approveMutation, handleClose, textReversalDisabled, trip, value])

  const handleReprove = useCallback(async (data: any) => {
    if (!trip) {
      ErrorToast('Erro ao executar ação');
      return
    }
    const reproveTripBody = {
      id: trip.id,
      description: data.observacao
    }

    try {
      await reproveMutation.mutateAsync(reproveTripBody)
      SuccessToast()
      handleClose()
    } catch (error) {
      toastAxiosError(error);
    }
  }, [handleClose, reproveMutation, trip])

  const handleAction = approved ? handleApprove : handleReprove;
  const ActionButton = approved ? GreenButton : RedButton;
  const buttonText = approved ? "Aprovar" : "Reprovar";

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth={true}>
      <CloseDialog handleClose={handleClose} title={approved ? 'Aprovação' : 'Reprovação'} />
      <DialogContent>
        <TextField
          id="observacao"
          fullWidth={true}
          multiline
          rows={4}
          error={!!errors['observacao']}
          {...register("observacao")}
        />
      </DialogContent>
      <DialogActions>
        {approved ? <ApproveContent /> : <ReproveContent />}
      </DialogActions>
    </Dialog>
  );

  function ApproveContent() {
    return (
      <div className='flex justify-between  w-full'>
        <Stack direction={'row'}>
          <Checkbox checked={textReversalDisabled} onChange={handleCheckReversalDisabledChange} />
          <TextFieldReversal value={trip.valorTotal} disabled={textReversalDisabled} setValue={setValue} />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <GreenButton onClick={handleSubmit(handleApprove)}>Aprovar</GreenButton>
        </Stack>
      </div>
    )
  }

  function ReproveContent() {
    return <RedButton onClick={handleSubmit(handleReprove)}>Reprovar</RedButton>
  }
}

function getInputSchema(approved: boolean) {
  if (!approved) {
    return yup.object({
      observacao: yup.string().required(),
    }).required();
  }

  return yup.object({
    observacao: yup.string(),
  });
}
