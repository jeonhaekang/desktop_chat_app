import styles from '@/styles/pages/chat/components/users.module.scss';

import { useCallback, useState } from 'react';
import { useMount, useRouter } from '@/utils/hooks';

import { roomsDB, userAuth, usersDB } from '@/firebase/models';
import { DataSnapshot } from 'firebase/database';

import { IUser } from '@/types/account';

const AllUserList = () => {
  const { push } = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);

  const createChatRoom = useCallback(async (guestuser: IUser) => {
    try {
      const currentUser = await userAuth.getCurrentUser();
      const createdRoom = await roomsDB.createRoom();

      const roomId = createdRoom.key;

      await roomsDB.inviteUser(roomId, currentUser);
      await roomsDB.inviteUser(roomId, guestuser);

      push(`/chat/${roomId}`);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      const userSnapShot = await usersDB.getUser(currentUser.uid);
      const userCheck = userSnapShot.val();

      if (!userCheck) {
        await usersDB.setUser(currentUser);
      }

      usersDB.subscribe((usersSnapShot: DataSnapshot) => {
        const updatedUser = usersSnapShot.val();
        delete updatedUser[currentUser.uid];
        setUsers(Object.values(updatedUser));
      });
    } catch (error) {
      alert(error.message);
    }
  });

  return (
    <ul className={styles.users}>
      {users.map((user) => {
        const { uid, displayName } = user;

        return (
          <li key={uid} className={styles.user} onDoubleClick={() => createChatRoom(user)}>
            {displayName}
          </li>
        );
      })}
    </ul>
  );
};

export default AllUserList;
