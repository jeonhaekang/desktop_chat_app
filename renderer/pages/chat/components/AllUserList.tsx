import styles from '@/styles/pages/chat/components/users.module.scss';

import { useCallback, useState } from 'react';
import { useMount, useRouter } from '@/hooks';

import { alertError, roomsDB, userAuth, usersDB } from '@/firebase/models';
import { DataSnapshot } from 'firebase/database';

import { IUser } from '@/types/account';

const AllUserList = () => {
  const { push } = useRouter();

  const [users, setUsers] = useState<IUser[]>([]);

  const createChatRoom = useCallback(async (guestuser: IUser) => {
    try {
      const currentUser = userAuth.getCurrentUser();

      const createdRoom = await roomsDB.createRoom();
      const roomId = createdRoom.key;

      await roomsDB.inviteUser(roomId, currentUser);
      await roomsDB.inviteUser(roomId, guestuser);

      push(`/chat/${roomId}`);
    } catch (error) {
      alertError(error);
    }
  }, []);

  useMount(async () => {
    const user = userAuth.getCurrentUser();

    try {
      const userSnapShot = await usersDB.getUser(user.uid);
      const userCheck = userSnapShot.val();

      if (!userCheck) {
        await usersDB.setUser(user);
      }

      usersDB.subscribe((usersSnapShot: DataSnapshot) => {
        const updatedUser = usersSnapShot.val();

        delete updatedUser[user.uid];
        setUsers(Object.values(updatedUser));
      });
    } catch (error) {
      alertError(error);
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
