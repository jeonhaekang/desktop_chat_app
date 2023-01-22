import styles from '@/styles/pages/chat/components/users.module.scss';

import { useRef, useState } from 'react';
import { useMount, useUnmount } from '@/utils/hooks';

import { userAuth, usersDB } from '@/firebase/models';
import { DataSnapshot, off } from 'firebase/database';

import { IUser } from '@/types/account';

interface IProps {
  onDoubleClickUser: (user: IUser) => void;
  blackListIds?: string[];
}

const AllUserList = ({ onDoubleClickUser, blackListIds }: IProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const subscribeRef = useRef([]);

  useMount(async () => {
    try {
      const currentUser = await userAuth.getCurrentUser();

      await usersDB.setUser(currentUser);

      const ref = usersDB.onUsersChanged((usersSnapShot: DataSnapshot) => {
        const updatedUser = usersSnapShot.val();

        if (updatedUser) {
          delete updatedUser[currentUser.uid];

          setUsers(Object.values(updatedUser));
        }
      });

      subscribeRef.current.push(ref);
    } catch (error) {
      alert(error.message);
    }
  });

  useUnmount(() => {
    subscribeRef.current.forEach((ref) => off(ref));
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
