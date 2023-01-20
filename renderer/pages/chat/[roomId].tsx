import styles from '@/styles/pages/chat/room.module.scss';

import { useMemo } from 'react';
import { useForm, useRouter } from '@/hooks';

import { Button, Link } from '@/components';
import MessageSend from '@/pages/chat/components/MessageSend';
import MessageHistory from '@/pages/chat/components/MessageHistory';

const Room = () => {
  const { query, back } = useRouter();

  const roomId = useMemo(() => query.roomId, []);

  return (
    <div className={styles.room}>
      <MessageHistory />
      <MessageSend />
      <Button color={'red'} onClick={() => back()}>
        나가기
      </Button>
    </div>
  );
};

export default Room;
