import { useState } from 'react';
import { User } from '../../models/user.ts';
import { getUsers } from '../user-api.ts';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await getUsers();
      setUsers(response);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
};
