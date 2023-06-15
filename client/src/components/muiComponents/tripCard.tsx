import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { RedButton, GreenButton } from '../../componentStyles/Buttons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { TextFieldReversal } from './textFieldReversal';
import ConfirmEventDialog from '../dialogs/confirmEventDialog';
import { Trip, TripCardProps } from '../../types';
import Loading from './loading';
import CircularProgress from '@mui/material/CircularProgress';
import { formatCurrency, formatDate } from '../../utils/format';

export default function TripCard(props: TripCardProps) {
  const { trip, loading } = props

  const [textReversalDisabled, setTextReversalDisabled] = useState<boolean>(true);
  const [isOpen, setOpen] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleApprove = () => {
    setApproved(true)
    setOpen(true)
  }
  const handleReprove = () => {
    setApproved(false)
    setOpen(true)
  }

  const handleCheckReversalDisabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextReversalDisabled(event.target.checked);
  };

  return (
    <>
      {
        !trip ?
          (
            loading ?
              <LoadingCard /> :
              <LoadingCard />
          ) :
          <ContentCard
            handleApprove={handleApprove}
            handleCheckReversalDisabledChange={handleCheckReversalDisabledChange}
            handleReprove={handleReprove}
            trip={trip}
            approved={approved}
            setOpen={setOpen}
            isOpen={isOpen}
            textReversalDisabled={textReversalDisabled}
          />
      }
    </>
  );
}

interface ContentCardProps {
  handleReprove: React.MouseEventHandler<HTMLButtonElement>
  handleApprove: React.MouseEventHandler<HTMLButtonElement>
  handleCheckReversalDisabledChange: ((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void) | undefined
  trip: Trip
  setOpen: Function
  isOpen: boolean
  approved: boolean
  textReversalDisabled: boolean
}

const ContentCard = (props: ContentCardProps) => {
  const { handleApprove, handleCheckReversalDisabledChange, handleReprove, trip, approved, isOpen, setOpen, textReversalDisabled } = props

  return (
    <Card className='w-full h-72'>
      <CardHeader
        title={`${trip.cidade}, ${trip.uf}`}
        subheader={`${formatDate(trip.dataInicio)} - ${formatDate(trip.dataFim)}`}
      >
      </CardHeader>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align="right">R$ {formatCurrency(trip.valorTotal)}</TableCell>
              </TableRow>
              <TableRow sx={{ border: 0 }}>
                <TableCell>Valor reembolsado</TableCell>
                <TableCell align="right">R$ {formatCurrency(trip.valorTotalReembolsado)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions disableSpacing className='flex flex-row justify-between align-center w-full'>
          {trip.status === "AGUARDANDO_APROVACAO" &&
          <>
        <Stack direction={'row'} spacing={2}>
           <RedButton onClick={handleReprove}>Reprovar</RedButton>
           <GreenButton onClick={handleApprove}>Aprovar</GreenButton>
           <ConfirmEventDialog isOpen={isOpen} setOpen={setOpen} approved={approved} />
           </Stack>
        <Stack direction={'row'} spacing={2}>
          <Checkbox checked={textReversalDisabled} onChange={handleCheckReversalDisabledChange} />
          <TextFieldReversal value={trip.valorTotal} disabled={textReversalDisabled} />
        </Stack>
          </>
           }
          {/* <RedButton onClick={handleReprove}>Reprovar</RedButton>
          <GreenButton onClick={handleApprove}>Aprovar</GreenButton>
          <ConfirmEventDialog isOpen={isOpen} setOpen={setOpen} approved={approved} /> */}
      </CardActions>
    </Card>
  )
}

const LoadingCard = () => {
  return (
    <Card className='w-full h-72'>
      <Box className='flex h-full items-center justify-center'>
        <CircularProgress />
      </Box>
    </Card>
  )
}