import { Link } from 'react-router-dom';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.container}>
      <h3>Next Social Network</h3>
      <Link to='/'>Home</Link>
    </div>
  );
};
