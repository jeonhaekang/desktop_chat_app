import styles from '@/styles/pages/chat/components/rooms.module.scss';
import cn from '@/styles';

import { useMemo, useRef, useState } from 'react';
import { useMount, useRouter, useUnmount } from '@/utils/hooks';
import { filterKeyOfArr } from '@/utils/common';

import { userAuth, userRoomsDB } from '@/firebase/models';
import { DataSnapshot, off } from 'firebase/database';

import { IUser } from '@/types/account';
import { IUserRooms } from '@/types/chat';

const ChatRoomCard = (props: IUserRooms) => {
  const { push } = useRouter();

  const [roomData, setRoomData] = useState<IUserRooms>(props);

  const subscribeRef = useRef([]);

  const roomMemberNames = useMemo(() => {
    return filterKeyOfArr<IUser>(roomData.users || [], 'displayName').join(' , ');
  }, [roomData]);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      const ref = userRoomsDB.onRoomChanged(currentUser.uid, roomData.roomId, (roomSnapShot: DataSnapshot) => {
        const room = roomSnapShot.val();

        if (room) {
          setRoomData(room);
        }
      });

      subscribeRef.current.push(ref);
    } catch (error) {
      alert(error);
    }
  });

  useUnmount(() => {
    subscribeRef.current.forEach((ref) => off(ref));
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
