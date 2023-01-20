import styles from '@/styles/pages/account/signUp.module.scss';

import { FormEvent, Fragment, useCallback } from 'react';
import { useForm } from '@/hooks';

import { userAuth } from '@/firebase/models';

import { ISignIn } from '@/types/account';

import { Button, Input, Link } from '@/components';

const SignUp = () => {
  const { register, formData, isValid } = useForm<ISignIn>({
    email: '',
    password: '',
  });

  const handleSignUp = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await userAuth.signUp(formData);
      } catch (error) {
        alert(error);
      }
    },
    [formData]
  );

  return (
    <Fragment>
      <h1 className={styles.title}>로그인</h1>

      <form onSubmit={handleSignUp} className={styles.form}>
        <Input title="아이디" required {...register('email')} />

        <Input type="password" title="비밀번호" required {...register('password')} />

        <Button type="submit" disabled={!isValid}>
          로그인
        </Button>

        <Link href="/account/sign-in">
          <Button color="white">회원가입</Button>
        </Link>
      </form>
    </Fragment>
  );
};

export default SignUp;
