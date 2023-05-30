import { EmployeeTripsDialogProps, Receipt, Trip } from '../../types/types';
import { useAuth } from '../../auth/authContext';
import { useState } from 'react';
import { useMediaQuery, TextField, Button, DialogContentText, Typography } from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { ErrorButton, WarningButton } from '../../componentStyles/Buttons';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import apiClient from '../../services/api';
import HistoryIcon from '@mui/icons-material/History';
import Loading from "../muiComponents/loading";


export default function EmployeeTripsDialog({ id }: EmployeeTripsDialogProps) {
  const { currentUser } = useAuth();
  const token = currentUser?.token;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [trips, setTrips] = useState<Trip[]>([])
  const [receipts, setReceipts] = useState<Receipt[]>([])

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
  };

  const handleClose = () => {
    setOpen(false);
    setTrips([])
  };


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

let contadorViagem = 1
let contadorComprovante = 1
  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <HistoryIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className='flex justify-center items-center' id="alert-dialog-title">
          {"Histórico de viagens"}
        </DialogTitle>
        
        <div className='flex'>

        <DialogContent className='flex flex-col w-1/2 gap-2'>
          {trips.map((trip: Trip) => (
            <Button onClick={()=> handleClickTrip(({id: trip.id}))} key={trip.id}> Viagem: {contadorViagem++} Cidade: {trip.cidade} </Button>
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
        </DialogActions>
      </Dialog>

    </div>
  )

}