import styles from '@/styles/pages/account/signIn.module.scss';

import { FormEvent, Fragment, useCallback } from 'react';
import { useForm } from '@/hooks';

import { userAuth } from '@/firebase/models';

import { ISignInForm } from '@/types/account';

import { Button, Input, Link } from '@/components';

const SignIn = () => {
  const { register, formData, isValid } = useForm<ISignInForm>({
    email: '',
    password: '',
    displayName: '',
  });

  const handleSignIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await userAuth.signIn(formData);
        await userAuth.profileUpdate(formData);
      } catch (error) {
        alert(error.message);
      }
    },
    [formData]
  );

  return (
    <Fragment>
      <h1 className={styles.title}>회원가입</h1>

      <form className={styles.form} onSubmit={handleSignIn}>
        <Input type="email" title="이메일" description="이메일을 입력해 주세요." required {...register('email')} />

        <Input
          type="password"
          title="비밀번호"
          description="최대 6자 이상 입력해 주세요."
          minLength={6}
          required
          {...register('password')}
        />

        <Input
          title="닉네임"
          description="최소 2자, 최대 8자를 허용합니다."
          minLength={2}
          maxLength={8}
          required
          {...register('displayName')}
        />

        <Button type="submit" disabled={!isValid}>
          회원가입
        </Button>

        <Link href="/account/sign-up">
          <Button color="white">로그인</Button>
        </Link>
      </form>
    </Fragment>
  );
};

export default SignIn;
