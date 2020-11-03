export interface Users extends Array<User> {
}

export interface User {
  id?: number;
  creationDate?: Date,
  name: string;
  email: string;
}
