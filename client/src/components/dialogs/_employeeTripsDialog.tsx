import { EmployeeTripsDialogProps, Receipt, Trip } from '../../types';
import { useAuth } from '../../auth/authContext';
import { useState } from 'react';
import { Stack, IconButton } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import apiClient from '../../services/api';
import HistoryIcon from '@mui/icons-material/History';
import { useMutation } from 'react-query';
import { BigDialog, CloseDialog, DialogTypography, ReceiptList, TripCard, TripList, VerticalDivider } from '../muiComponents';

export default function EmployeeTripsDialog({ id }: EmployeeTripsDialogProps): JSX.Element {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [existentTrip, setExistentTrip] = useState<number | undefined>(undefined)

  const header = { headers: { Authorization: `Bearer ${currentUser?.token}` } }

  const mutationTrips = useMutation(fetchTrips)
  const mutationTrip = useMutation(fetchTrip)

  return (
    <div>
      <IconButton onClick={handleClickOpenDialog}>
        <HistoryIcon />
      </IconButton>
      <BigDialog open={open} handleClose={handleClose}>
        <CloseDialog handleClose={handleClose} />
        <DialogContent sx={{ overflow: 'hidden' }} className='h-full'>
          <Stack spacing={2} direction={'row'}>
            <Stack spacing={3} className='w-1/3 items-center justify-center'>
              <DialogTypography>Viagens</DialogTypography>
              {existentTrip && <TripCard loading={mutationTrip.isLoading} trip={mutationTrip?.data} />}
              <TripList handleClickTrip={handleClickTrip} trips={mutationTrips?.data} existentTrip={existentTrip} />
            </Stack>
            <VerticalDivider />
            <Stack spacing={3} className='w-1/3 items-center'>
              <DialogTypography>Comprovantes</DialogTypography>
              {receipts.map((receipt: Receipt) => (
                <ReceiptList key={receipt.id} id={receipt.id} aprovado={receipt.aprovado} data={receipt.data} local={receipt.local} observacao={receipt.observacao}
                  observacao_Empresa={receipt.observacao_Empresa} valor={receipt.valor} valorReembolsado={receipt.valorReembolsado} viagem_id={receipt.viagem_id} categoria={receipt.categoria} />
              ))}
            </Stack>
            <VerticalDivider />
            <Stack className='w-1/3'>

            </Stack>
          </Stack>
        </DialogContent>



        {/* <div className='flex'>
          <DialogContent className='flex flex-col w-1/2 gap-2'>
            
          </DialogContent>
          <div id="linha-vertical" className='border-r border-white'></div>
          <DialogContent className='flex flex-col w-1/2 gap-2'>
            {receipts.map((receipt: Receipt) => (
              <Button key={receipt.id}> Comprovante: {contadorComprovante++} Comprovante: {receipt.categoria} </Button>
            ))}
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions> */}
      </BigDialog>
    </div>
  )

  async function fetchTrip(id: number): Promise<Trip> {
    const { data } = await apiClient.get(`viagem/${id}`, header);
    return data as Trip;
  }

  async function fetchTrips(): Promise<Trip[]> {
    const { data } = await apiClient.get(`viagem/usuario/${id}`, header);
    return data as Trip[];
  }

  function handleClickOpenDialog(): void {
    setOpen(true);
    mutationTrips.mutate();
  }

  function handleClose(): void {
    setOpen(false);
  }

  async function handleClickTrip(id: number) {
    setExistentTrip(id);
    mutationTrip.mutate(id);

    const { data } = await apiClient.get(`comprovante/viagem/${id}`, header);
    setReceipts(data);
  }
}
