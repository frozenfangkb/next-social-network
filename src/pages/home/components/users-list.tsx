import { useUsers } from '../../../modules/user/api/hooks/use-users.ts';
import { useEffect } from 'react';
import { Card } from '../../../modules/shared/components/card.tsx';

import styles from './users-list.module.scss';

export const UsersList = () => {
  const { users, loading, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Card title='User list'>
      <div className={styles.usersContainer}>
        {loading && <p>Loading...</p>}
        {!loading && !users.length && <p>No users found</p>}
        {!loading &&
          users.length &&
          users.map(user => (
            <div className={styles.userItem} key={user.id}>
              <p className={styles.name}>{user.name}</p>
              <span className={styles.subtitle}>
                {user.email} · {user.company.name}
              </span>
            </div>
          ))}
      </div>
    </Card>
  );
};
