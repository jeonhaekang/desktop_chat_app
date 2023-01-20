import styles from '@/styles/pages/app.module.scss';
import '@/styles/index.scss';
import { AccountContextProvider } from '@/contexts/AccountContext';

const App = ({ Component, pageProps }) => {
  return (
    <div className={styles.rootContainer}>
      <AccountContextProvider>
        <Component {...pageProps} />
      </AccountContextProvider>
    </div>
  );
};

export default App;
