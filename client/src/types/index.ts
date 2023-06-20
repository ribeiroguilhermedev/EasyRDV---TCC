import React from "react";

export interface User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  cpf?: string | null;
  rg?: string | null;
  data_nascimento?: Date;
  empresa_id: number;
  guid: string;
  observacao?: string | null;
  data_criacao: Date;
  flag_ativo: boolean;
  foto?: string | null;

  senha?: string;
}
export interface Trip {
  id: number;
  cidade: string;
  dataFim: Date;
  dataInicio: Date;
  descricao: string;
  status: string;
  uf: string;
  valorTotal: number;
  valorTotalReembolsado: number;
  usuario_id: number;
}

export interface approveTripBody {
  id: number;
  description: string;
  value: number;
  fullValue: boolean;
}
export interface reproveTripBody {
  id: number;
  description: string;
}

export interface Receipt {
  id: number;
  aprovado: boolean;
  data: Date;
  local: string;
  observacao: string;
  observacao_Empresa: string;
  valor: number;
  valorReembolsado: number;
  viagem_id: number;
  categoria: string;
}

export interface AuthenticatedUser extends User {
  token: string;
  expires?: number;
}



//Props
export interface EmployeeRegisterProps {
  open: boolean;
  onClose: Function;
  onUserCreated: Function;
  users: User[];
}

export interface ConfirmEventProps {
  isOpen: boolean;
  setOpen: Function;
  trip: Trip;
  disabled: boolean;
  approved: boolean;
}

export interface EmployeeCardProps {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  flag_ativo: boolean;
  data_criacao: Date;
  data_nascimento?: Date;
  cpf?: string | null;
  rg?: string | null;
  foto?: string | null;
  observacao?: string | null;
  users: User[],
  onDeletedUser: Function;
}

export interface EmployeeDeleteDialogProps {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  flag_ativo: boolean;
  data_criacao: Date;
  users: User[],
  onDeletedUser: Function;
}
export interface EmployeeEditDialogProps {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  cpf?: string | null;
  rg?: string | null;
  data_nascimento?: Date;
  foto?: string | null;
  observacao?: string | null;
  users: User[];
  onDeletedUser: Function;
}
export interface EmployeeTripsDialogProps {
  id: number;
}

export interface EmployeeProps {
  employeeControlOpen: boolean;
  setEmployeeControlOpen: Function;
}

export interface SearchProps {
  busca: string;
  setBusca: Function;
}

export interface TextFieldReversalProps {
  value: number;
  disabled: boolean;
  setValue: Function;
}

export interface TripListProps {
  trips: Trip[] | undefined;
  existentTrip?: number;
  handleClickTrip: Function;
}

export interface StatusCircleProps {
  status?: number;
  hide?: boolean
}

export interface CloseDialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  title?: string
}

export interface BigDialogProps {
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  open: boolean;
  children: React.ReactNode;
}

export interface TripCardProps {
  trip: Trip | undefined;
  loading: boolean;
}

export interface ErrorMessage {
  message: string
}

