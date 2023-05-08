import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '../../types/types';


export default function EmployeeCard({ nome, email, id, data_criacao, sobrenome }: User) {
    function stringAvatar(name: string) {
        return {
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
    
      
  return (
    <Card sx={{ maxWidth: 345, minWidth:345, backgroundColor: '#080808'}} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#add8e6' }} aria-label="recipe" {...stringAvatar(`${nome} ${sobrenome}`)}>

          </Avatar>
        }
        title={`${nome}`}
        subheader={"September 14, 2016"}
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
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}