import styles from '@/styles/pages/chat/components/users.module.scss';

import { useState } from 'react';
import { useMount } from '@/utils/hooks';

import { userAuth, usersDB } from '@/firebase/models';
import { DataSnapshot } from 'firebase/database';

import { IUser } from '@/types/account';

interface IProps {
  onDoubleClickUser: (user: IUser) => void;
  blackListIds?: string[];
}

const AllUserList = ({ onDoubleClickUser, blackListIds }: IProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

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

        if (updatedUser) {
          delete updatedUser[currentUser.uid];

          setUsers(Object.values(updatedUser));
        }
      });
    } catch (error) {
      alert(error.message);
    }
  });

  return (
    <ul className={styles.users}>
      {users.map((user) => {
        const { uid, displayName } = user;

        if (blackListIds && blackListIds.includes(uid)) {
          return null;
        }

        return (
          <li key={uid} className={styles.user} onDoubleClick={() => onDoubleClickUser(user)}>
            {displayName}
          </li>
        );
      })}
    </ul>
  );
};

export default AllUserList;
