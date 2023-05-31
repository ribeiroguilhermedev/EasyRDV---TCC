import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import EmployeeDeleteDialog from '../dialogs/employeeDeleteDialog';
import { RedButton, GreenButton } from '../../componentStyles/Buttons';
import EmployeeEditDialog from '../dialogs/employeeEditDialog';
import EmployeeTripsDialog from '../dialogs/employeeTripsDialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Stack, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { TextFieldReversal } from './textFieldReversal';

export default function TripCard() {
  const [approved, setApproved] = useState(false);
  const [textReversalDisabled, setTextReversalDisabled] = useState<boolean>(true);

  const handleApprove = () => { }
  const handleReprove = () => { }

  const handleCheckReversalDisabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextReversalDisabled(event.target.checked);
  };

  const data ={
    total: 24534121.00,
    reembolso: 5000.00,
    uf: 'PR',
    cidade:'Curitiba',
    dtInicio:'30/05/2023',
    dtFim:'15/06/2023',
  }

  return (
    <Card sx={{ width: `100%` }} >
      <CardHeader
        title={`${data.cidade}, ${data.uf}`}
        subheader={`${data.dtInicio} - ${data.dtFim}`}
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>Total</TableCell>
                <TableCell align="right">R$ {data.total}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>Valor reembolsado</TableCell>
                <TableCell align="right">R$ {data.reembolso}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions disableSpacing className='flex flex-row justify-between align-center w-full'>
        <Stack direction={'row'} spacing={2}>
          <RedButton onClick={handleReprove}>Reprovar</RedButton>
          <GreenButton onClick={handleApprove}>Aprovar</GreenButton>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <Checkbox checked={textReversalDisabled} onChange={handleCheckReversalDisabledChange}/>
          <TextFieldReversal value={data.total} disabled={textReversalDisabled}/>
        </Stack>
      </CardActions>
    </Card>
  );
}