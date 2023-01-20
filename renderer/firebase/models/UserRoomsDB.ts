import { IUserRooms } from '@/types/chat';
import { TSnapShot } from '@/types/model';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import Base from './Base';

class UserRoomsDB extends Base {
  db = getDatabase(this.app);

  subscribe(uid: string, onAdded: TSnapShot) {
    const messageRef = ref(this.db, `/UserRooms/${uid}`);

    onValue(messageRef, onAdded);
  }

  sendAlert(uid: string, roomId: string, data: IUserRooms) {
    const roomRef = ref(this.db, `UserRooms/${uid}/${roomId}`);

    return set(roomRef, data);
  }
}

const userRoomsDB = new UserRoomsDB();

export default userRoomsDB;
