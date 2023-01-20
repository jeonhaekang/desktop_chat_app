import styles from '@/styles/pages/chat/room.module.scss';

import { useRouter } from '@/utils/hooks';

import { Button } from '@/components';
import MessageSend from '@/pages/chat/components/MessageSend';
import MessageHistory from '@/pages/chat/components/MessageHistory';

const Room = () => {
  const { back } = useRouter();

  return (
    <div className={styles.room}>
      <MessageHistory />

      <MessageSend />

      <Button color={'white'} onClick={() => back()}>
        나가기
      </Button>
    </div>
  );
};

export default Room;
