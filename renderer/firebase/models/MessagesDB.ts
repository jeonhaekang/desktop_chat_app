import { IMessage } from '@/types/chat';
import { TSnapShot } from '@/types/model';
import { getDatabase, onChildAdded, push, ref } from 'firebase/database';
import Base from './Base';

class MessagesDB extends Base {
  db = getDatabase(this.app);

  subscribe(roomId: string, onAdded: TSnapShot) {
    const roomRef = ref(this.db, `Messages/${roomId}`);

    onChildAdded(roomRef, onAdded);

    return roomRef;
  }

  sendMessage(roomId: string, message: IMessage) {
    const roomRef = ref(this.db, `Messages/${roomId}`);

    return push(roomRef, message);
  }
}

const messagesDB = new MessagesDB();

export default messagesDB;
