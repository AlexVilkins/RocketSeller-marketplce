import { CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthApi from '../../../widgets/auth/api';
import styles from './Login.module.scss';

const AdminLogin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { adminLogin } = useAuthApi();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const creds = { name, password };
      await adminLogin(creds);
      navigate(`${/admin/}`);
    } catch (error) {
      if (error?.response?.data?.errorCode === 10002) {
        enqueueSnackbar('Неверный логин или пароль', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      } else
        enqueueSnackbar(error.response?.data?.message || 'Ошибка авторизации', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.panel}>
          <h3 style={{ textAlign: 'center' }}>Вход в панель администратора</h3>
          <form onSubmit={handleLogin} className={styles.form}>
            <input
              type="email"
              placeholder="email"
              autoComplete="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {loading ? (
              <button>
                <CircularProgress size="30px" color="white" />
              </button>
            ) : (
              <button onClick={handleLogin}>Войти</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
