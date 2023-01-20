import styles from '@/styles/pages/chat/main.module.scss';

import { useCallback, useState } from 'react';

import { ITab, TTab } from '@/types/main';

import { Button } from '@/components';
import Users from '@/pages/chat/components/Users';
import Rooms from '@/pages/chat/components/Rooms';

export const TAB_USERS = 'users';
export const TAB_ROOMS = 'rooms';

const TAB_LIST: ITab[] = [
  { tab: TAB_USERS, name: '유저목록' },
  { tab: TAB_ROOMS, name: '채팅방' },
];

const Main = () => {
  const [selectedTab, setSelectedTab] = useState<TTab>(TAB_USERS);

  const TabButton = useCallback(
    (props: ITab) => {
      const { tab, name } = props;

      return (
        <Button color={tab === selectedTab ? 'blue' : 'white'} onClick={() => setSelectedTab(tab)}>
          {name}
        </Button>
      );
    },
    [selectedTab]
  );

  return (
    <div>
      <div className={styles.tab}>
        {TAB_LIST.map((tab) => {
          return <TabButton key={tab.tab} {...tab} />;
        })}
      </div>
      <div className={styles.content}>
        {selectedTab === TAB_USERS && <Users />}
        {selectedTab === TAB_ROOMS && <Rooms />}
      </div>
    </div>
  );
};

export default Main;
