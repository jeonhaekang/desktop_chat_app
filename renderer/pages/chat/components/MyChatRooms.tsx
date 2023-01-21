import styles from '@/styles/pages/chat/components/rooms.module.scss';

import { useState } from 'react';
import { useMount, useRouter } from '@/utils/hooks';

import { userAuth, userRoomsDB } from '@/firebase/models';
import { DataSnapshot } from 'firebase/database';

import { IUserRooms } from '@/types/chat';
import ChatRoomCard from '@/pages/chat/components/ChatRoomCard';

const MyChatRooms = () => {
  const { push } = useRouter();

  const [rooms, setRooms] = useState<IUserRooms[]>([]);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      userRoomsDB.subscribe(currentUser.uid, (roomSnapShot: DataSnapshot) => {
        if (roomSnapShot.val()) {
          const room: IUserRooms = roomSnapShot.val();

          setRooms((prev) => [...prev, room]);
        }
      });
    } catch (error) {
      alert(error);
    }
  });

  return (
    <ul className={styles.rooms}>
      {rooms.map((room) => {
        return <ChatRoomCard key={room.roomId} {...room} />;
      })}
    </ul>
  );
};

export default MyChatRooms;
