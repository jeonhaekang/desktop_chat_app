import Base from './Base';
import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from 'firebase/auth';
import { IProfile, ISignIn } from '@/types/account';

class UserAuth extends Base {
  auth = getAuth();

  subscribe(onChangeAuth: NextOrObserver<User>) {
    onAuthStateChanged(this.auth, onChangeAuth);
  }

  signIn(account: ISignIn) {
    const { email, password } = account;

    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signUp(account: ISignIn) {
    const { email, password } = account;

    return signInWithEmailAndPassword(this.auth, email, password);
  }

  profileUpdate(profile: IProfile) {
    const currentUser = this.auth.currentUser;

    return updateProfile(currentUser, profile);
  }

  getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      const currentUser = this.auth.currentUser;

      if (currentUser) {
        resolve(currentUser);
      } else {
        reject({ message: '로그인 정보가 없습니다. 다시 로그인 해주세요.', code: 401 });
      }
    });
  }
}

const userAuth = new UserAuth();

export default userAuth;
