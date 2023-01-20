import '@/styles/index.scss';
import styles from '@/styles/pages/app.module.scss';

const App = ({ Component, pageProps }) => {
  return (
    <div className={styles.rootContainer}>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
