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

export { ISignIn, ISignInForm, IProfile };
