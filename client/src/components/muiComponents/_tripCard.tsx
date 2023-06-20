import { Box, CircularProgress, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { useState } from 'react';
import { formatCurrency, formatDate } from '../../utils/format';
import { isAguardandoAprovacao, statusEnum } from '../../enumeration';
import { StatusCircle } from '.';
import { ConfirmEventDialog } from '../dialogs';
import { RedButton, GreenButton } from '../../componentStyles/Buttons';
import { Trip, TripCardProps } from '../../types';

export default function TripCard(props: TripCardProps): JSX.Element {
  const { trip, loading } = props

  return (
    <>
      {
        !trip ?
          (
            loading ?
              <LoadingCard /> :
              <LoadingCard />
          ) :
          <ContentCard trip={trip} />
      }
    </>
  );
}

interface ContentCardProps {
  trip: Trip
}

function ContentCard({ trip }: ContentCardProps): JSX.Element {
  const [isOpen, setOpen] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleApprove = async () => {
    setApproved(true)
    setOpen(true)
  }
  const handleReprove = () => {
    setApproved(false)
    setOpen(true)
  }
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
        <Stack direction={'row'} spacing={2}>
          {
            isAguardandoAprovacao(trip.status) &&
            <>
              <RedButton onClick={handleReprove}>Reprovar</RedButton>
              <GreenButton onClick={handleApprove}>Aprovar</GreenButton>
              <ConfirmEventDialog isOpen={isOpen} setOpen={setOpen} trip={trip} approved={approved} />
            </>
          }
        </Stack>
        <Stack direction={'row'}>
          <div className='flex items-center justify-end h-[30px]'>
            <StatusCircle status={trip.status} />
          </div>
        </Stack>
      </CardActions>
    </Card>
  );
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