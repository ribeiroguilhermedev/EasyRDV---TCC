import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Receipt } from '../../types';

export default function ReceiptList({id, aprovado, data, local, observacao, observacao_Empresa, valor, valorReembolsado, viagem_id, categoria}: Receipt ) {
  return (
    <Box sx={{ minWidth: 450 }}>
      <Card key={id} variant="outlined">
        <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {categoria}
      </Typography>
      <Typography variant="h5" component="div">
      </Typography>
      <Typography variant="body2">
        Valor R$ {valor}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Ver mais</Button>
    </CardActions>
    </Card>
    </Box>
  );
}