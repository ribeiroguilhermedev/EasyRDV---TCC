export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface AuthenticatedUser extends User {
    token: string;
  }