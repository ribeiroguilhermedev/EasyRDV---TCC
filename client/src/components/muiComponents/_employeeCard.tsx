import { Card, CardHeader, CardContent, CardActions, Avatar, Typography } from '@mui/material';
import { EmployeeCardProps, User } from '../../types';
import { GreenButton } from '../../componentStyles/Buttons';
import { useMutation } from 'react-query';
import { useAuth } from '../../auth/authContext';
import { EmployeeDeleteDialog, EmployeeEditDialog, EmployeeTripsDialog } from '../dialogs';
import apiClient from '../../services/api';

export default function EmployeeCard({ nome, email, id, data_criacao, sobrenome, onDeletedUser, users, flag_ativo, data_nascimento, observacao, foto, rg, cpf }: EmployeeCardProps): JSX.Element {
  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const { currentUser } = useAuth();
  const token = currentUser?.token;

  const activateEmployee = useMutation((id: number) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const data = { flag_ativo: true };
    return apiClient.put(`usuario/atualiza/flag/${id}`, data, config).then((response) => {
      const userUpdated = response.data
      const indexOfUser = (users.findIndex((user: User) => user.id === id));
      const arrCurrentUsers = users.filter(p => p.id !== id)
      arrCurrentUsers.splice(indexOfUser, 0, userUpdated)
      onDeletedUser(arrCurrentUsers)
    });
  })


  return (
    <Card sx={{ maxWidth: 345, minWidth: 345, backgroundColor: flag_ativo ? '#1c1b1b' : '#080808' }} >
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
          {flag_ativo ? `Email: ${email}` : 'USUÁRIO INATIVO, reative para mais informações'}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {flag_ativo ?
          <>
            <EmployeeEditDialog
              nome={nome}
              sobrenome={sobrenome}
              email={email}
              id={id}
              data_nascimento={data_nascimento}
              cpf={cpf}
              rg={rg}
              foto={foto}
              observacao={observacao}
              users={users}
              onDeletedUser={onDeletedUser} />
            <EmployeeDeleteDialog
              nome={nome}
              sobrenome={sobrenome}
              email={email}
              id={id}
              data_criacao={data_criacao}
              users={users}
              flag_ativo={flag_ativo}
              onDeletedUser={onDeletedUser} />
            <EmployeeTripsDialog id={id} />

          </>
          :
          <GreenButton onClick={() => activateEmployee.mutate(id)}>Ativar</GreenButton>
        }
      </CardActions>
    </Card>
  );
}