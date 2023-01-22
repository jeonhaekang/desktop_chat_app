import styles from '@/styles/pages/chat/components/rooms.module.scss';

import { useRef, useState } from 'react';
import { useMount, useUnmount } from '@/utils/hooks';

import { userAuth, userRoomsDB } from '@/firebase/models';
import { DataSnapshot, off } from 'firebase/database';

import { IUserRooms } from '@/types/chat';
import ChatRoomCard from '@/pages/chat/components/ChatRoomCard';

const MyChatRooms = () => {
  const [rooms, setRooms] = useState<IUserRooms[]>([]);

  const subscribeRef = useRef([]);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      userRoomsDB.onRoomsAdded(currentUser.uid, (roomSnapShot: DataSnapshot) => {
        if (roomSnapShot.val()) {
          const room: IUserRooms = roomSnapShot.val();

          setRooms((prev) => [...prev, room]);
        }
      });
    } catch (error) {
      alert(error);
    }
  });

  useUnmount(() => {
    subscribeRef.current.forEach((ref) => off(ref));
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
