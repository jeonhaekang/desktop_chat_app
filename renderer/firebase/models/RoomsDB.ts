import { IUser } from '@/types/account';
import { getDatabase, push, ref, set } from 'firebase/database';
import Base from './Base';

class RoomsDB extends Base {
  db = getDatabase(this.app);

  createRoom() {
    const roomsRef = ref(this.db, `Rooms`);

    return push(roomsRef);
  }

  inviteUser(roomId: string, user: IUser) {
    const { uid, displayName } = user;

    const userRef = ref(this.db, `Rooms/${roomId}/${uid}`);

    return set(userRef, { displayName });
  }
}

const roomsDB = new RoomsDB();

export default roomsDB;
