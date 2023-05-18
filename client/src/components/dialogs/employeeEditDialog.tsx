import { EmployeeEditDialogProps, User } from '../../types/types';
import { useAuth } from '../../auth/authContext';
import { useRef, useState } from 'react';
import { useMediaQuery, TextField } from '@mui/material';
import { useMutation } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { ErrorButton } from '../../componentStyles/Buttons';
import { useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import apiClient from '../../services/api';
import EditIcon from '@mui/icons-material/Edit';
import * as yup from "yup";
import InputMask from 'react-input-mask';


export default function EmployeeEditDialog({ nome, email, id, sobrenome, onDeletedUser, users, data_nascimento, rg, cpf, foto, observacao }: EmployeeEditDialogProps) {
  const { currentUser } = useAuth();
  const token = currentUser?.token;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [cpfValidationFailed, setCpfValidationFailed] = useState(false);
  const [rgValidationFailed, setRGValidationFailed] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cpfRef = useRef<HTMLInputElement>(null);
  const rgRef = useRef<HTMLInputElement>(null);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editEmployee = useMutation((user: User) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    console.log(user);
    
    const data = { nome: user.nome, sobrenome: user.sobrenome, email: user.email, rg: user.rg, cpf: user.cpf, data_nascimento: user.data_nascimento, observacao: user.observacao, foto: user.foto };
    return apiClient.put(`usuario/atualiza/${user.id}`, data, config).then((response) => {
      const userUpdated = response.data
      const indexOfUser = (users.findIndex((user: User) => user.id === id));
      const arrCurrentUsers = users.filter(p => p.id !== id)
      arrCurrentUsers.splice(indexOfUser, 0, userUpdated)
      onDeletedUser(arrCurrentUsers)
    });
  })
  const schema = yup.object({
    nome: yup.string().min(3).matches(/^[A-Za-z]+$/, 'Insira somente letras').required(),
    sobrenome: yup.string().min(3).matches(/^[A-Za-z]+$/, 'Insira somente letras').required(),
    cpf: yup.string(),
    rg: yup.string(),
    data_nascimento: yup.date().max(new Date(), 'Não é possível incluir uma data futura').required(),
    email: yup.string().email('Precisa ser um email válido').required(),
  }).required();

  const ValidateCPF_RG: () => boolean = () => {
    const cpf = cpfRef.current?.value.replace(/\D/g, "")

    let valid = true;

    if (cpf?.length !== 11) {
      setCpfValidationFailed(true)
      valid = false
    }

    const rg = rgRef.current?.value.replace(/\D/g, "")
    if (rg?.length !== 9) {
      setRGValidationFailed(true)
      valid = false
    }
    return valid;
  };

  const handleSubmitInternal = async (data: Object) => {
    if (!currentUser) return
    if (!ValidateCPF_RG()) return

    setLoading(true)
    const user = data as User
    user.id = id
    user.cpf = cpfRef.current?.value
    user.rg = rgRef.current?.value
    user.nome = user.nome[0].toUpperCase() + user.nome.substring(1)
    user.sobrenome = user.sobrenome[0].toUpperCase() + user.sobrenome.substring(1)

    await editEmployee.mutateAsync(user)


    setOpen(false)
    setLoading(false)
  }

  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(schema)
  });

  const hasInputError = Object.keys(errors).length > 0
  const hasRGOrCpfError = cpfValidationFailed || rgValidationFailed


  return (
    <div>
    <IconButton aria-label="edit" onClick={handleClickOpen}>
    <EditIcon />
  </IconButton>
  <Dialog open={isOpen} onClose={handleClose} fullScreen={fullScreen}>
                <div className='flex justify-between items-center'>
                    <DialogTitle>Edição de funcionário</DialogTitle>
                    {hasInputError && !cpfValidationFailed && <p className='pr-6 text-error'>Preencha os campos obrigatórios</p>}
                    {hasRGOrCpfError && !hasInputError && <p className='pr-6 text-error'>Preencha corretamente os campos</p>}
                </div>
                <DialogContent className='flex flex-row gap-3' style={{ padding: "0px 24px" }}>
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        defaultValue={nome}
                        id="nome"
                        label="Nome"
                        type="text"
                        variant="outlined"
                        error={!!errors['nome']}
                        {...register("nome", { required: true })}
                    />
                    <TextField className='basis-1/2'
                        autoFocus
                        margin="dense"
                        id="last_name"
                        label="Sobrenome"
                        defaultValue={sobrenome}
                        type="text"
                        variant="outlined"
                        error={!!errors['sobrenome']}
                        {...register("sobrenome", { required: true })}
                        />
                </DialogContent>
                <DialogContent style={{ padding: "0px 24px" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        defaultValue={email}
                        fullWidth
                        variant="outlined"
                        error={!!errors['email']}
                        {...register("email", { required: true })}
                        />
                </DialogContent>
                <DialogContent className='flex flex-row gap-3' style={{ padding: "0px 24px" }}>
                    <TextField className='basis-1/3'
                        autoFocus
                        margin="dense"
                        id="data_nascimento"
                        type="date"
                        defaultValue={data_nascimento}
                        label="Data nascimento"
                        error={!!errors['data_nascimento']}
                        InputLabelProps={{ shrink: true }}
                        {...register("data_nascimento", { required: true })}
                        />
                    <InputMask
                        mask="99.999.999-9"
                        disabled={false}
                        className='basis-1/3'
                        autoFocus
                        id="rg"
                        type="text"
                        defaultValue ={rg ? rg : ''}
                        inputRef={rgRef}
                        onChange={() => setRGValidationFailed(false)}
                        >
                        <TextField
                            margin="dense"
                            label="RG"
                            variant="outlined"
                            error={rgValidationFailed}
                            />
                    </InputMask>
                    <InputMask
                        mask="999.999.999-99"
                        disabled={false}
                        className='basis-1/3'
                        autoFocus
                        id="cpf"
                        type="text"
                        defaultValue ={cpf ? cpf : ''}
                        inputRef={cpfRef}
                        onChange={() => setCpfValidationFailed(false)}
                        >
                        <TextField
                            margin="dense"
                            label="CPF"
                            variant="outlined"
                            error={cpfValidationFailed}
                            />
                    </InputMask>
                </DialogContent>
                <DialogContent style={{ padding: "0px 24px" }}>
                    <TextField
                        id="observacao"
                        label="Observação"
                        margin='dense'
                        defaultValue ={observacao}
                        multiline
                        fullWidth
                        rows={4}
                        placeholder="Digite uma observação sobre o funcionário se necessário."
                        {...register("observacao")}
                        />
                </DialogContent>
                <DialogActions className='mr-4'>
                    <ErrorButton onClick={handleClose}>Cancelar</ErrorButton>
                    <LoadingButton
                        onClick={
                          handleSubmit(handleSubmitInternal)
                        }
                        startIcon={<EditIcon />}
                        variant='outlined'
                        loadingPosition="start"
                        loading={loading}
                        >
                        Editar
                    </LoadingButton>
                </DialogActions>
            </Dialog >
    </div >
  );
}