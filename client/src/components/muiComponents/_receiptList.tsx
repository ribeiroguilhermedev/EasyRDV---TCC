import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { Receipt } from '../../types';

export default function ReceiptList({ id, aprovado, data, local, observacao, observacao_Empresa, valor, valorReembolsado, viagem_id, categoria }: Receipt): JSX.Element {
  return (
    <Card className='w-full' variant="outlined">
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
  );
}