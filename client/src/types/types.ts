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

export interface EmployeeRegisterProps {
  open: boolean;
  onClose: Function;
}
