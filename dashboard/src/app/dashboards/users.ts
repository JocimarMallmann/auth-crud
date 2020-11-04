export interface Users extends Array<User> {
}

// Interface User que eu recebo do back-end
export interface User {
  id?: number;
  creationDate?: Date,
  name: string;
  email: string;
}

// Interface User para enviar os dados para o banco de dados
export interface NewUser {
  nome: string;
  email: string;
  senhaHash?: string;
}
