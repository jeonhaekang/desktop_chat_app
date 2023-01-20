import styles from '@/styles/pages/app.module.scss';
import '@/styles/index.scss';

const App = ({ Component, pageProps }) => {
  return (
    <div className={styles.rootContainer}>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
