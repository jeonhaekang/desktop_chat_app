import { IUser } from '@/types/account';
import { TSnapShot } from '@/types/model';
import { get, getDatabase, onValue, push, ref, set } from 'firebase/database';
import Base from './Base';

class RoomsDB extends Base {
  db = getDatabase(this.app);

  subscribe(roomId: string, onChange: TSnapShot) {
    const roomRef = ref(this.db, `Rooms/${roomId}`);

    onValue(roomRef, onChange);
  }

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
