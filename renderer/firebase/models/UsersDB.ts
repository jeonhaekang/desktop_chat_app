import Base from './Base';
import { get, getDatabase, onChildAdded, onValue, ref, set } from 'firebase/database';
import { TSnapShot } from '@/types/model';
import { User } from 'firebase/auth';

class UsersDB extends Base {
  db = getDatabase(this.app);

  subscribe(onChange: TSnapShot) {
    const usersRef = ref(this.db, 'Users');

    onValue(usersRef, onChange);
  }

  getUser(uid: string) {
    const userRef = ref(this.db, `Users/${uid}`);

    return get(userRef);
  }

  setUser(user: User) {
    const { uid, displayName } = user;

    const userRef = ref(this.db, `Users/${uid}`);

    return set(userRef, { uid, displayName });
  }
}

const usersDB = new UsersDB();

export default usersDB;
