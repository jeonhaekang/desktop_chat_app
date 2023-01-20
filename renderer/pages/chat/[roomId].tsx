import styles from '@/styles/pages/chat/room.module.scss';

import { useMemo } from 'react';
import { useForm, useRouter } from '@/hooks';

import MessageSend from '@/pages/chat/components/MessageSend';
import MessageHistory from './components/MessageHistory';

const Room = () => {
  const { query } = useRouter();

  const roomId = useMemo(() => query.roomId, []);

  return (
    <div className={styles.room}>
      <MessageHistory />
      <MessageSend />
    </div>
  );
};

export default Room;
