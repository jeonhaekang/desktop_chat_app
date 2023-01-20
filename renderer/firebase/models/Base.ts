import app from '@/firebase/config';

class Base {
  app = app;
}

export default Base;

export const alertError = (error: unknown) => {
  let message = 'unknown error';

  if (error instanceof Error) message = error.message;

  alert(message);
};
