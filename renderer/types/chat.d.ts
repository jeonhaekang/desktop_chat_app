import { IUser } from './account';

interface IMessage extends IUser {
  message: string;
}

export { IMessage };
