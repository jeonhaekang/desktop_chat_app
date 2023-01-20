interface ISignIn {
  email: string;
  password: string;
}

interface ISignInForm extends ISignIn {
  displayName: string;
}

interface IProfile {
  displayName?: string;
  photoURL?: string;
}

interface IUser {
  uid: string;
  displayName: string;
}

export { ISignIn, ISignInForm, IProfile, IUser };
