import styles from '@/styles/pages/chat/room.module.scss';
import cn from '@/styles';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useMount, useRouter, useUnmount } from '@/utils/hooks';
import { filterKeyOfArr } from '@/utils/common';

import { off } from 'firebase/database';
import { roomsDB, userAuth, userRoomsDB } from '@/firebase/models';

import { IUser } from '@/types/account';

import { Button } from '@/components';
import MessageSend from '@/pages/chat/components/MessageSend';
import MessageHistory from '@/pages/chat/components/MessageHistory';
import AllUserList from '@/pages/chat/components/AllUserList';

const Room = () => {
  const { back, query } = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);
  const [openUserList, setOpenUserList] = useState(false);

  const subscribeRef = useRef([]);

  const userNameList = useMemo(() => filterKeyOfArr<IUser>(users, 'displayName'), [users]);
  const userIdList = useMemo(() => filterKeyOfArr<IUser>(users, 'uid'), [users]);

  const roomId = useMemo(() => {
    const roomId = query.roomId;

    return Array.isArray(roomId) ? roomId[0] : roomId;
  }, []);

  const handleInvite = useCallback(async (user: IUser) => {
    await roomsDB.inviteUser(roomId, user);
  }, []);

  const handleOpenState = useCallback(() => {
    setOpenUserList((prev) => !prev);
  }, []);

  useMount(async () => {
    const ref = roomsDB.subscribe(roomId, async (usersSnapShot) => {
      if (usersSnapShot.val()) {
        const userList: IUser[] = Object.values(usersSnapShot.val());

        setUsers(userList);
      }
    });

    subscribeRef.current.push(ref);
  });

  useMount(async () => {
    try {
      const user = await userAuth.getCurrentUser();

      const ref = userRoomsDB.subscribeRoom(user.uid, roomId, () => {
        userRoomsDB.updatedChecked(user.uid, roomId, true);
      });

      subscribeRef.current.push(ref);
    } catch (error) {
      alert(error.message);
    }
  });

  useUnmount(() => {
    subscribeRef.current.forEach((ref) => off(ref));
  });

  return (
    <div className={cn(styles.room, { [styles.openUserList]: openUserList })}>
      <MessageHistory />

      <div className={styles.userList}>{userNameList.join(', ')}</div>

      <MessageSend />

      <Button color={'white'} onClick={() => back()}>
        뒤로가기
      </Button>

      <Button onClick={handleOpenState}>{openUserList ? '닫기' : '초대하기'}</Button>

      {openUserList && <AllUserList onDoubleClickUser={handleInvite} blackListIds={userIdList} />}
    </div>
  );
};

export default Room;
