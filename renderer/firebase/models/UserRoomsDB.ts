import { IUserRooms } from '@/types/chat';
import { TSnapShot } from '@/types/model';
import { getDatabase, onChildAdded, onValue, ref, set, update } from 'firebase/database';
import Base from './Base';

class UserRoomsDB extends Base {
  db = getDatabase(this.app);

  onRoomsAdded(uid: string, onAdded: TSnapShot) {
    const messageRef = ref(this.db, `/UserRooms/${uid}`);

    onChildAdded(messageRef, onAdded);

    return messageRef;
  }

  onRoomChanged(uid: string, roomId: string, onChanged: TSnapShot) {
    const roomRef = ref(this.db, `/UserRooms/${uid}/${roomId}`);

    onValue(roomRef, onChanged);

    return roomRef;
  }

  setRoom(uid: string, roomId: string, data: IUserRooms) {
    const roomRef = ref(this.db, `UserRooms/${uid}/${roomId}`);

    return set(roomRef, data);
  }

  updateChecked(uid: string, roomId: string, data: object) {
    const roomRef = ref(this.db, `UserRooms/${uid}/${roomId}`);

    return update(roomRef, data);
  }
}

const userRoomsDB = new UserRoomsDB();

export default userRoomsDB;
