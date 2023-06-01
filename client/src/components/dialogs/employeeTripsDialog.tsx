import { EmployeeTripsDialogProps, Receipt, Trip } from '../../types';
import { useAuth } from '../../auth/authContext';
import { useState } from 'react';
import { useMediaQuery, Typography, Stack, IconButton, Divider } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import apiClient from '../../services/api';
import HistoryIcon from '@mui/icons-material/History';
import TripCard from '../muiComponents/tripCard';
import TripList from '../muiComponents/tripList';
import CloseDialog from '../muiComponents/closeDialog';
import BigDialog from '../muiComponents/bigDialog';

export default function EmployeeTripsDialog({ id }: EmployeeTripsDialogProps) {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([])
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [receipts, setReceipts] = useState<Receipt[]>([])

  const header = { headers: { Authorization: `Bearer ${currentUser?.token}` } }

  const handleClickOpen = async () => {
    setOpen(true);
    const ret = await apiClient.get(`viagem/usuario/${id}`, header)
    setTrips(ret.data)
  }

  const handleClose = () => {
    setOpen(false);
    setTrips([])
  }

  const handleClickTrip = async (id: number) => {


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
              <TripCard />
              <TripList handleClickTrip={handleClickTrip} trips={trips} />
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#ffffff52' }} />
            <Stack className='w-1/3'>

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