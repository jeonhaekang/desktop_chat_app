import { createContext, ReactNode, useContext, useState } from 'react';
import { useMount, useRouter } from '@/hooks';

import { userAuth } from '@/firebase/models';
import { IUser } from '@/types/account';

const AccountContext = createContext(null);

export const AccountContextProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [currentUser, setCurrentUser] = useState<IUser>(null);

  useMount(() => {
    userAuth.subscribe((currentUser) => {
      push(currentUser ? '/chat' : '/account/sign-up');

      if (currentUser) {
        const { uid, displayName } = currentUser;

        setCurrentUser({ uid, displayName });
      }
    });
  });

  return <AccountContext.Provider value={currentUser}>{children}</AccountContext.Provider>;
};

export const useAccount = () => {
  return useContext(AccountContext);
};
