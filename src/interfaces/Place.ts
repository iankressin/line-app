import { User } from './User';

export interface Place {
  name: string;
  open: boolean;
  queue: User[];
  _id: string;
  email: string;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
