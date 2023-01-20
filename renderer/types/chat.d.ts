import { IUser } from './account';

interface IMessage extends IUser {
  message: string;
}

interface IUserRooms {
  roomId: string;
  lastMessage: string;
}

export { IMessage, IUserRooms };
