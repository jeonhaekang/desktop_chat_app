import styles from '@/styles/pages/chat/components/rooms.module.scss';

import { useMemo, useState } from 'react';
import { useMount, useRouter } from '@/utils/hooks';
import { filterKeyOfArr } from '@/utils/common';

import { userAuth, userRoomsDB } from '@/firebase/models';
import { DataSnapshot } from 'firebase/database';

import { IUser } from '@/types/account';
import { IUserRooms } from '@/types/chat';
import cn from '@/styles';

const ChatRoomCard = (props: IUserRooms) => {
  const { push } = useRouter();

  const [roomData, setRoomData] = useState(props);

  const roomMemberNames = useMemo(() => {
    return filterKeyOfArr<IUser>(roomData.users, 'displayName').join(' , ');
  }, [roomData]);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      userRoomsDB.subscribeRoom(currentUser.uid, roomData.roomId, (roomSnapShot: DataSnapshot) => {
        const room = roomSnapShot.val();

        if (room) {
          setRoomData(room);
        }
      });
    } catch (error) {
      alert(error);
    }
  });

  return (
    <li
      className={cn(styles.room, { [styles.checked]: !roomData.checked })}
      onDoubleClick={() => push(`/chat/${roomData.roomId}`)}
    >
      <p className={styles.users}>{roomMemberNames}</p>
      <p className={styles.lastMessage}>{roomData.lastMessage}</p>
    </li>
  );
};

export default ChatRoomCard;
