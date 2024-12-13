import styles from './home.module.scss';
import { UsersList } from './components/users-list/users-list.tsx';

export const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <UsersList />
    </div>
  );
};
