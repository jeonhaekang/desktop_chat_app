import { createContext, ReactNode, useContext, useState } from 'react';
import { useMount, useRouter } from '@/utils/hooks';

import { userAuth } from '@/firebase/models';
import { IUser } from '@/types/account';

const AccountContext = createContext(null);

export const AccountContextProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [currentUser, setCurrentUser] = useState<IUser>(null);

  useMount(() => {
    userAuth.onAuthChanged((currentUser) => {
      if (currentUser) {
        const { uid, displayName } = currentUser;

        setCurrentUser({ uid, displayName });
      } else {
        push('/');

        setCurrentUser(null);
      }
    });
  });

  return <AccountContext.Provider value={currentUser}>{children}</AccountContext.Provider>;
};

export const useAccount = () => {
  return useContext(AccountContext);
};
