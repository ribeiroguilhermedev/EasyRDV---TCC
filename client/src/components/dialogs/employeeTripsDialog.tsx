import { EmployeeTripsDialogProps, Receipt, Trip } from '../../types';
import { useAuth } from '../../auth/authContext';
import { useState } from 'react';
import { useMediaQuery, Typography, Stack, IconButton, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import apiClient from '../../services/api';
import HistoryIcon from '@mui/icons-material/History';
import TripCard from '../muiComponents/tripCard';
import TripList from '../muiComponents/tripList';


export default function EmployeeTripsDialog({ id }: EmployeeTripsDialogProps) {
  const { currentUser } = useAuth();
  const token = currentUser?.token;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([])
  const [receipts, setReceipts] = useState<Receipt[]>([])

  const handleClickOpen = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    apiClient.get(`viagem/usuario/${id}`, {
      ...config
    }).then((response => {
      setTrips(response.data)
    }));

    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setTrips([])
  }

  const handleClickTrip = (id: number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    apiClient.get(`comprovante/viagem/${id}`, {
      ...config
    }).then((response => {
      setReceipts(response.data)
    }));
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <HistoryIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={'xl'}
        PaperProps={{
          sx: {
            height: 800
          }
        }}
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
      >
        <DialogContent sx={{ overflow: 'hidden' }} className='h-full'>
          <Stack spacing={2} direction={'row'}>
            <Stack spacing={3} className='w-1/3 items-center justify-center'>
              <Typography variant='h6'>Viagens</Typography>
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
      </Dialog>

    </div>
  )

}