import { IUser } from '@/types/account';
import { get, getDatabase, push, ref, set } from 'firebase/database';
import Base from './Base';

class RoomsDB extends Base {
  db = getDatabase(this.app);

  createRoom() {
    const roomsRef = ref(this.db, `Rooms`);

    return push(roomsRef);
  }

  inviteUser(roomId: string, user: IUser) {
    const userRef = ref(this.db, `Rooms/${roomId}/${user.uid}`);

    return set(userRef, user);
  }

  getRoom(roomId: string) {
    const roomRef = ref(this.db, `Rooms/${roomId}`);

    return get(roomRef);
  }
}

const roomsDB = new RoomsDB();

export default roomsDB;
