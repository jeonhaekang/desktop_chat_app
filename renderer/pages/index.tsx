import styles from '@/styles/pages/app.module.scss';

import { Button, Link } from '@/components';

function Home() {
  return (
    <div className={styles.home}>
      <h1>채팅 앱</h1>

      <Link href={'/account/sign-up'}>
        <Button>로그인</Button>
      </Link>
      <Link href={'/account/sign-in'}>
        <Button color="white">회원가입</Button>
      </Link>
    </div>
  );
}

export default Home;
