import styles from '@/styles/pages/chat/components/rooms.module.scss';

import { useState } from 'react';
import { useMount, useRouter } from '@/utils/hooks';
import { filterKeyOfArr } from '@/utils/common';

import { userAuth, userRoomsDB } from '@/firebase/models';
import { DataSnapshot } from 'firebase/database';

import { IUserRooms } from '@/types/chat';
import { IUser } from '@/types/account';

const MyChatRooms = () => {
  const { push } = useRouter();

  const [rooms, setRooms] = useState<IUserRooms[]>([]);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      userRoomsDB.subscribe(currentUser.uid, (roomSnapShot: DataSnapshot) => {
        if (roomSnapShot.val()) {
          const rooms: IUserRooms[] = Object.values(roomSnapShot.val());

          setRooms(rooms);
        }
      });
    } catch (error) {
      alert(error);
    }
  });

  return (
    <ul className={styles.rooms}>
      {rooms.map((room) => {
        const { roomId, lastMessage, users } = room;

        const displayNames = filterKeyOfArr<IUser>(users, 'displayName');

        return (
          <li key={roomId} className={styles.room} onDoubleClick={() => push(`/chat/${roomId}`)}>
            <p className={styles.users}>{displayNames.join(' , ')}</p>
            <p className={styles.lastMessage}>{lastMessage}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MyChatRooms;
