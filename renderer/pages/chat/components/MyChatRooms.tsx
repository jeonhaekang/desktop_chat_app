import styles from '@/styles/pages/chat/components/rooms.module.scss';

import { useMemo, useState } from 'react';
import { useMount, useRouter } from '@/hooks';

import { userAuth, userRoomsDB } from '@/firebase/models';
import { DataSnapshot } from 'firebase/database';

import { IUserRooms } from '@/types/chat';

const MyChatRooms = () => {
  const { push } = useRouter();

  const [rooms, setRooms] = useState<IUserRooms[]>([]);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      userRoomsDB.subscribe(currentUser.uid, (roomSnapShot: DataSnapshot) => {
        const rooms: IUserRooms[] = Object.values(roomSnapShot.val());

        setRooms(rooms);
      });
    } catch (error) {
      alert(error);
    }
  });

  return (
    <ul className={styles.rooms}>
      {rooms.map((room) => {
        const { roomId, lastMessage } = room;

        return (
          <li key={roomId} className={styles.room} onDoubleClick={() => push(`/chat/${roomId}`)}>
            {lastMessage}
          </li>
        );
      })}
    </ul>
  );
};

export default MyChatRooms;
