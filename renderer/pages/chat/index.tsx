import styles from '@/styles/pages/chat/main.module.scss';

import { useCallback, useMemo } from 'react';
import { useRouter } from '@/utils/hooks';

import { roomsDB, userAuth } from '@/firebase/models';

import { ITab } from '@/types/main';
import { IUser } from '@/types/account';

import { Button, Link } from '@/components';
import AllUserList from '@/pages/chat/components/AllUserList';
import MyChatRooms from '@/pages/chat/components/MyChatRooms';

export const TAB_USERS = 'users';
export const TAB_ROOMS = 'rooms';

const TAB_LIST: ITab[] = [
  { tab: TAB_USERS, name: '유저목록' },
  { tab: TAB_ROOMS, name: '채팅방' },
];

const Main = () => {
  const { query, push } = useRouter();

  const selctedTab = useMemo(() => query.tab || TAB_USERS, [query]);

  const handleSignOut = useCallback(() => {
    userAuth.requestSignOut();
  }, []);

  const handleCreatRoom = useCallback(async (guestuser: IUser) => {
    try {
      const currentUser = await userAuth.getCurrentUser();
      const createdRoom = await roomsDB.createRoom();

      const roomId = createdRoom.key;

      await roomsDB.setUser(roomId, currentUser);
      await roomsDB.setUser(roomId, guestuser);

      push(`/chat/${roomId}`);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  const TabButton = useCallback(
    (props: ITab) => {
      const { tab, name } = props;

      return (
        <Link
          href={{
            pathname: '/chat',
            query: { tab },
          }}
        >
          <Button color={selctedTab === tab ? 'blue' : 'white'}>{name}</Button>
        </Link>
      );
    },
    [selctedTab]
  );

  return (
    <div className={styles.main}>
      <div className={styles.tab}>
        {TAB_LIST.map((tab) => {
          return <TabButton key={tab.tab} {...tab} />;
        })}
      </div>

      <div className={styles.content}>
        {selctedTab === TAB_USERS && (
          <div className={styles.userList}>
            <AllUserList onDoubleClickUser={handleCreatRoom} />
          </div>
        )}
        {selctedTab === TAB_ROOMS && <MyChatRooms />}
      </div>

      <Button color="white" onClick={handleSignOut}>
        로그아웃
      </Button>
    </div>
  );
};

export default Main;
