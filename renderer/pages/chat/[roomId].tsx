import styles from '@/styles/pages/chat/room.module.scss';

import { useMount, useRouter } from '@/utils/hooks';

import { Button } from '@/components';
import MessageSend from '@/pages/chat/components/MessageSend';
import MessageHistory from '@/pages/chat/components/MessageHistory';
import AllUserList from '@/pages/chat/components/AllUserList';
import { useCallback, useMemo, useState } from 'react';
import { IUser } from '@/types/account';
import { roomsDB } from '@/firebase/models';
import cn from '@/styles';
import { filterKeyOfArr } from '@/utils/common';

const Room = () => {
  const { back, query } = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);
  const [openUserList, setOpenUserList] = useState(false);

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

  useMount(() => {
    roomsDB.subscribe(roomId, (usersSnapShot) => {
      const userList: IUser[] = Object.values(usersSnapShot.val());

      setUsers(userList);
    });
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
