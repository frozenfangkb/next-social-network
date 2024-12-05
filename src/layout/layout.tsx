import styles from './layout.module.scss';
import { Header } from './components/header.tsx';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.bodyContainer}>
        <Outlet />
      </div>
    </div>
  );
};
