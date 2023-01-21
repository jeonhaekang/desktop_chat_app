import { IUserRooms } from '@/types/chat';
import { TSnapShot } from '@/types/model';
import { getDatabase, onChildAdded, onValue, ref, set, update } from 'firebase/database';
import Base from './Base';

class UserRoomsDB extends Base {
  db = getDatabase(this.app);

  subscribe(uid: string, onAdded: TSnapShot) {
    const messageRef = ref(this.db, `/UserRooms/${uid}`);

    onChildAdded(messageRef, onAdded);

    return messageRef;
  }

  subscribeRoom(uid: string, roomId: string, onAdded: TSnapShot) {
    const roomRef = ref(this.db, `/UserRooms/${uid}/${roomId}`);

    onValue(roomRef, onAdded);

    return roomRef;
  }

  setRoom(uid: string, roomId: string, data: IUserRooms) {
    const roomRef = ref(this.db, `UserRooms/${uid}/${roomId}`);

    return set(roomRef, data);
  }

  updatedChecked(uid: string, roomId: string, checked: boolean) {
    const roomRef = ref(this.db, `UserRooms/${uid}/${roomId}`);

    return update(roomRef, { checked });
  }
}

const userRoomsDB = new UserRoomsDB();

export default userRoomsDB;
