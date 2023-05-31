import { EmployeeTripsDialogProps, Receipt, Trip } from '../../types/types';
import { useAuth } from '../../auth/authContext';
import { useEffect, useState } from 'react';
import { useMediaQuery, TextField, Button, DialogContentText, Typography, Stack, Card } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { RedButton, WarningButton } from '../../componentStyles/Buttons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import apiClient from '../../services/api';
import HistoryIcon from '@mui/icons-material/History';
import Loading from "../muiComponents/loading";
import TripCard from '../muiComponents/tripCard';


export default function EmployeeTripsDialog({ id }: EmployeeTripsDialogProps) {
  const { currentUser } = useAuth();
  const token = currentUser?.token;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [perPage, setPerPage] = useState(20)
  const [trips, setTrips] = useState<Trip[]>([])
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [dialogHeight, setDialogHeight] = useState(0)

  const handleClickOpen = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    apiClient.get(`viagem/usuario/${id}`, {
      params: { limit: perPage, offset: currentPage - 1 }, ...config
    }).then((response => {
      setTrips(response.data)
      const totalElements = response.data.totalElements

      if (totalElements < perPage) {
        setTotalPages(0)
        return
      }

      const totalPages = Math.ceil(totalElements / perPage)
      setTotalPages(totalPages)
    }));

    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setTrips([])
  }

  const handleClickTrip = (id: EmployeeTripsDialogProps) => {
    console.log(id.id);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    apiClient.get(`comprovante/viagem/${id.id}`, {
      params: { limit: perPage, offset: currentPage - 1 }, ...config
    }).then((response => {
      setReceipts(response.data)
      const totalElements = response.data.totalElements

      if (totalElements < perPage) {
        setTotalPages(0)
        return
      }

      const totalPages = Math.ceil(totalElements / perPage)
      setTotalPages(totalPages)
    }));

  }

  if (dialogHeight === 0) {
    const windowHeight = window.innerHeight
    setDialogHeight(windowHeight - 50)
  }

  let contadorViagem = 1
  let contadorComprovante = 1
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <HistoryIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
      >
        <DialogContent>
          <Stack spacing={3}>
              <Typography variant='h6'>Viagens</Typography>
              <TripCard/>
          </Stack>
        </DialogContent>



        {/* <div className='flex'>
          <DialogContent className='flex flex-col w-1/2 gap-2'>
            {trips.map((trip: Trip) => (
              <Button onClick={() => handleClickTrip(({ id: trip.id }))} key={trip.id}> Viagem: {contadorViagem++} Cidade: {trip.cidade} </Button>
            ))}
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