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
  data_fim: Date;
  data_inicio: Date;
  descricao: string;
  status: number;
  uf: string;
  valorTotal: number;
  valorTotalReembolsado: number;
  usuario_id: number;
}
export interface Trip {
  id: number;
  cidade: string;
  data_fim: Date;
  data_inicio: Date;
  descricao: string;
  status: number;
  uf: string;
  valorTotal: number;
  valorTotalReembolsado: number;
  usuario_id: number;
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
  users: User[],
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
