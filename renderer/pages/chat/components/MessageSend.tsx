import styles from '@/styles/pages/chat/components/messageSend.module.scss';

import { FormEvent, useCallback, useMemo } from 'react';
import { useForm, useRouter } from '@/hooks';

import { messagesDB, roomsDB, userAuth, userRoomsDB } from '@/firebase/models';

import { Button, Input } from '@/components';

const MessageSend = () => {
  const { query } = useRouter();

  const roomId = useMemo(() => {
    const roomId = query.roomId;

    return Array.isArray(roomId) ? roomId[0] : roomId;
  }, []);

  const { register, formData, isValid, reset } = useForm<{ message: string }>({ message: '' });

  const handleSendMessage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const currentUser = await userAuth.getCurrentUser();
        await messagesDB.sendMessage(roomId, { ...currentUser, ...formData });

        const roomSnapShot = await roomsDB.getRoom(roomId);

        roomSnapShot.forEach((userSnapShot) => {
          const uid = userSnapShot.key;

          userRoomsDB.sendAlert(uid, roomId, { lastMessage: formData.message, roomId });
        });
        reset();
      } catch (error) {
        alert(error);
      }
    },
    [formData]
  );

  return (
    <form className={styles.messageSendForm} onSubmit={handleSendMessage}>
      <Input required {...register('message')} />

      <Button type="submit" disabled={!isValid}>
        전송
      </Button>
    </form>
  );
};

export default MessageSend;
