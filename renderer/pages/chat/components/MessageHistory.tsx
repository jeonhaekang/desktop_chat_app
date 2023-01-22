import styles from '@/styles/pages/chat/components/messageHistory.module.scss';
import cn from '@/styles';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useMount, useRouter, useUnmount } from '@/utils/hooks';
import { useAccount } from '@/contexts/AccountContext';

import { messagesDB } from '@/firebase/models';
import { DataSnapshot, off } from 'firebase/database';

import { IMessage } from '@/types/chat';

const MessageHistory = () => {
  const { query } = useRouter();
  const currentUser = useAccount();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const subscribeRef = useRef([]);

  const roomId = useMemo(() => {
    const roomId = query.roomId;

    return Array.isArray(roomId) ? roomId[0] : roomId;
  }, []);

  const scrollTarget = useRef<HTMLLIElement>(null);

  useMount(() => {
    messagesDB.onMessageAdded(roomId, async (messageSnapShot: DataSnapshot) => {
      const message = messageSnapShot.val();

      setMessages((prev) => [...prev, message]);
    });
  });

  useUnmount(() => {
    subscribeRef.current.forEach((ref) => off(ref));
  });

  useEffect(() => {
    scrollTarget.current.scrollIntoView();
  }, [messages]);

  return (
    <ul className={styles.messageHistory}>
      {messages.map((messageData, idx) => {
        const { uid, displayName, message } = messageData;

        const isMine = uid === currentUser.uid;

        return (
          <li key={`message_${idx}`} className={cn(styles.messageBox, { [styles.isMine]: isMine })}>
            <span>{displayName}</span>
            <p>{message}</p>
          </li>
        );
      })}
      <li ref={scrollTarget} />
    </ul>
  );
};

export default MessageHistory;
