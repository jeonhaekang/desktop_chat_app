import { IUser } from './account';

interface IMessage extends IUser {
  message: string;
}

interface IUserRooms {
  lastMessage: string;
}

export { IMessage, IUserRooms };
