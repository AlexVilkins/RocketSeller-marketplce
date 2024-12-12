import React, { useEffect, useState } from 'react';
import { getUserData } from '../../../../user/widgets/registration/api/currentUserDataAPI';

const UserEmailUI = () => {
  const [login, setLogin] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        setLogin(response.result.login);
      } catch (err) {
        setError('e-mail не загружен');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <>загрузка...</>;
  }

  if (error) {
    return <>{error}</>;
  }

  return <>{login ? login : 'e-mail'}</>;
};

export default UserEmailUI;
