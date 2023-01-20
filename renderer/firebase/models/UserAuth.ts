import Base from './Base';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { IProfile, ISignIn } from '@/types/account';

class UserAuth extends Base {
  auth = getAuth();

  signIn(account: ISignIn) {
    const { email, password } = account;

    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  profileUpdate(profile: IProfile) {
    const currentUser = this.auth.currentUser;

    return updateProfile(currentUser, profile);
  }
}

const userAuth = new UserAuth();

export default userAuth;
