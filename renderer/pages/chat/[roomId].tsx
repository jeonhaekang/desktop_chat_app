import styles from '@/styles/pages/chat/room.module.scss';

import { useRouter } from '@/utils/hooks';

import { Button } from '@/components';
import MessageSend from '@/pages/chat/components/MessageSend';
import MessageHistory from '@/pages/chat/components/MessageHistory';
import AllUserList from '@/pages/chat/components/AllUserList';
import { useCallback, useMemo, useState } from 'react';
import { IUser } from '@/types/account';
import { roomsDB } from '@/firebase/models';
import cn from '@/styles';

const Room = () => {
  const { back, query } = useRouter();

  const [openUserList, setOpenUserList] = useState(false);

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

  return (
    <div className={cn(styles.room, { [styles.openUserList]: openUserList })}>
      <MessageHistory />

      <MessageSend />

      <Button color={'white'} onClick={() => back()}>
        나가기
      </Button>

      <Button onClick={handleOpenState}>{openUserList ? '닫기' : '초대하기'}</Button>

      {openUserList && <AllUserList onDoubleClickUser={handleInvite} />}
    </div>
  );
};

export default Room;
