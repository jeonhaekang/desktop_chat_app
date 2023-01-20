import styles from '@/styles/pages/chat/components/messageSend.module.scss';

import { useForm, useRouter } from '@/hooks';

import { Button, Input } from '@/components';
import { FormEvent, useCallback, useMemo } from 'react';
import { alertError, messagesDB, userAuth } from '@/firebase/models';
import { IMessage } from '@/types/chat';

const MessageSend = () => {
  const { query } = useRouter();

  const roomId = useMemo(() => {
    const roomId = query.roomId;

    return Array.isArray(roomId) ? roomId[0] : roomId;
  }, []);

  const currentUser = useMemo(() => {
    const user = userAuth.getCurrentUser();
    const { uid, displayName } = user;

    return { uid, displayName };
  }, []);

  const { register, formData, isValid, reset } = useForm<IMessage>({ ...currentUser, message: '' });

  const handleSendMessage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await messagesDB.sendMessage(roomId, formData);
        reset();
      } catch (error) {
        alertError(error);
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
