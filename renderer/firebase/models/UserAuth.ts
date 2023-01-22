import Base from './Base';
import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  signOut,
} from 'firebase/auth';
import { IProfile, ISignIn, IUser } from '@/types/account';

class UserAuth extends Base {
  auth = getAuth();

  onAuthChanged(onChangeAuth: NextOrObserver<User>) {
    onAuthStateChanged(this.auth, onChangeAuth);
  }

  createAccount(account: ISignIn) {
    const { email, password } = account;

    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  requestSignIn(account: ISignIn) {
    const { email, password } = account;

    return signInWithEmailAndPassword(this.auth, email, password);
  }

  requestSignOut() {
    return signOut(this.auth);
  }

  updateProfile(profile: IProfile) {
    const currentUser = this.auth.currentUser;

    return updateProfile(currentUser, profile);
  }

  getCurrentUser(): Promise<IUser> {
    return new Promise((resolve, reject) => {
      const currentUser = this.auth.currentUser;

      if (currentUser) {
        const { uid, displayName } = currentUser;

        resolve({ uid, displayName });
      } else {
        reject({ message: '로그인 정보가 없습니다. 다시 로그인 해주세요.', code: 401 });
      }
    });
  }
}

const userAuth = new UserAuth();

export default userAuth;
