export interface Users extends Array<User> {
}

interface User {
  id: number;
  creationDate: Date,
  name: string;
  email: string;
}
