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
}

const userAuth = new UserAuth();

export default userAuth;
