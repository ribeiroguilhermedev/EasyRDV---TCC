export interface User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  cpf?: string | null;
  rg?: string | null;
  data_nascimento?: Date | null;
  empresa_id: number;
  guid: string;
  observacao?: string | null;
  data_criacao: Date;
  flag_ativo: boolean;
  foto?: string | null;

  senha?: string;
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

export interface EmployeeCardProps {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  data_criacao: Date;
  users: User[],
  onDeletedUser: Function;
}

export interface EmployeeDeleteDialoProps {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  data_criacao: Date;
  users: User[],
  onDeletedUser: Function;
}

export interface EmployeeProps {
  employeeControlOpen: boolean;
  setEmployeeControlOpen: Function;
}
