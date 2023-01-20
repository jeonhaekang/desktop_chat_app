import { useMount, useRouter } from '@/hooks';

import { userAuth } from '@/firebase/models';

function Home() {
  const router = useRouter();

  useMount(() => {
    userAuth.subscribe((currentUser) => {
      router.push(currentUser ? '/chat/main' : '/account/signup');
    });
  });

  return null;
}

export default Home;
