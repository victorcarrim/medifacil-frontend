import { useState, useEffect } from 'react';
import { GenericService } from '../assets/api/service/GenericService';

export function useFetchUsers(url) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await GenericService.findAllList(url);
        // console.log(response.data);
        if (!response.data) {
          throw new Error('Não foi possível buscar os dados');
        }
        const filteredUsers = response.data.filter(user => user.role === 'client');
        setUsers(filteredUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [url]); 

  return { users, isLoading, error };
}