import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EmployeeCardProps } from '../../types/types';
import EmployeeDeleteDialog from '../dialogs/employeeDeleteDialog';


export default function EmployeeCard({ nome, email, id, data_criacao, sobrenome, onDeletedUser, users }: EmployeeCardProps) {
  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


  return (
    <Card sx={{ maxWidth: 345, minWidth: 345, backgroundColor: '#080808' }} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#add8e6' }} aria-label="recipe" {...stringAvatar(`${nome} ${sobrenome}`)}>

          </Avatar>
        }
        title={`${nome} ${sobrenome}`}
        subheader={String(data_criacao)}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Email: ${email}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <EmployeeDeleteDialog
          nome={nome}
          email={email}
          sobrenome={sobrenome}
          id={id}
          data_criacao={data_criacao}
          users={users}
          onDeletedUser={onDeletedUser} />
      </CardActions>
    </Card>
  );
}