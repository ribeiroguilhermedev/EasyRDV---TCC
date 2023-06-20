import { EmployeeTripsDialogProps, Receipt, Trip } from '../../types';
import { useAuth } from '../../auth/authContext';
import { useState } from 'react';
import { Typography, Stack, IconButton, Divider, Paper, Box } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import apiClient from '../../services/api';
import HistoryIcon from '@mui/icons-material/History';
import TripCard from '../muiComponents/tripCard';
import TripList from '../muiComponents/tripList';
import CloseDialog from '../muiComponents/closeDialog';
import BigDialog from '../muiComponents/bigDialog';
import ReceiptList from '../muiComponents/receiptList';
import { useMutation } from 'react-query';



export default function EmployeeTripsDialog({ id }: EmployeeTripsDialogProps) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [existentTrip, setExistentTrip] = useState<number | undefined>(undefined)

  const header = { headers: { Authorization: `Bearer ${currentUser?.token}` } }

  const fetchTrips = async () => {
    const { data } = await apiClient.get(`viagem/usuario/${id}`, header);
    return data;
  }
  const mutationTrips = useMutation(fetchTrips)

  const fetchTrip = async (id: number) => {
    const { data } = await apiClient.get(`viagem/${id}`, header);
    return data;
  }
  const mutationTrip = useMutation(fetchTrip)

  const handleClickOpen = async () => {
    setOpen(true);
    mutationTrips.mutate()
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleClickTrip = async (id: number) => {
    setExistentTrip(id)
    mutationTrip.mutate(id)

    const ret = await apiClient.get(`comprovante/viagem/${id}`, header)
    setReceipts(ret.data)
  }
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <HistoryIcon />
      </IconButton>
      <BigDialog open={open} handleClose={handleClose}>
        <CloseDialog handleClose={handleClose} />
        <DialogContent sx={{ overflow: 'hidden' }} className='h-full'>
          <Stack spacing={2} direction={'row'}>
            <Stack spacing={3} className='w-1/3 items-center justify-center'>
              <Typography variant='h6' sx={{ color: (theme) => theme.palette.grey[400] }}>Viagens</Typography>
              {existentTrip && <TripCard loading={mutationTrip.isLoading} trip={mutationTrip?.data} /> }
              <TripList handleClickTrip={handleClickTrip} trips={mutationTrips?.data} existentTrip={existentTrip}/>
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#ffffff52' }} />
            <Stack spacing={3} className='w-1/3 items-center'>
            <Typography variant='h6' sx={{ color: (theme) => theme.palette.grey[400] }}>Comprovantes</Typography>
            {receipts.map((receipt: Receipt) => (
              <ReceiptList key={receipt.id} id={receipt.id} aprovado={receipt.aprovado} data={receipt.data} local={receipt.local} observacao={receipt.observacao} 
              observacao_Empresa={receipt.observacao_Empresa} valor={receipt.valor} valorReembolsado={receipt.valorReembolsado} viagem_id={receipt.viagem_id} categoria={receipt.categoria} />
            ))}
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#ffffff52' }} />
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
}
