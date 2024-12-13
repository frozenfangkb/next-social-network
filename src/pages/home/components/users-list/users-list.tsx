import { useUsers } from '@/modules/user/api/hooks/use-users.ts';

import styles from './users-list.module.scss';
import { useNavigate } from 'react-router';

export const UsersList = () => {
  const { data: users, isFetching: loading } = useUsers();
  const navigate = useNavigate();

  const handleNavigateToUser = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className='flex flex-col gap-4'>
      <h1>Users List</h1>
      <div className={styles.usersContainer}>
        {loading && <p>Loading...</p>}
        {!loading && !users.length && <p>No users found</p>}
        {!loading &&
          users.length &&
          users.map(user => (
            <div
              className={styles.userItem}
              key={user.id}
              onClick={() => handleNavigateToUser(user.id)}
            >
              <p className={styles.name}>{user.name}</p>
              <span className={styles.subtitle}>
                {user.email} · {user.company.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};
