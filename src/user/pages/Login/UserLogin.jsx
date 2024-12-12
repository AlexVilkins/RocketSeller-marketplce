import { CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import loginSvg from '@assets/auth/Login_Register.svg';
import useAuthApi from '../../../widgets/auth/api';
import styles from './Login.module.scss';

const UserLogin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { userLogin } = useAuthApi();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const creds = { name, password };
      await userLogin(creds);
      navigate(`${/user/}`);
    } catch (error) {
      if (error?.response?.data?.errorCode === 10002) {
        enqueueSnackbar(error.response?.data?.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      } else {
        enqueueSnackbar('Неверный логин или пароль' || 'Ошибка авторизации', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.decorWrapper}>
            <div className={styles.textWrapper}>
              <h3 className={styles.title}>С возвращением!</h3>
              <p className={styles.text}>Давайте приступим к работе</p>
            </div>
            <img className={styles.svg} src={loginSvg} alt="line" />
          </div>
          <div className={styles.panel}>
            <form onSubmit={handleLogin} className={styles.form}>
              <input
                type="email"
                placeholder="Email"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link
                className={styles.forgotPassword}
                to={`/auth/user/forgotPassword`}
              >
                Забыли пароль?
              </Link>
              {loading ? (
                <button>
                  <CircularProgress size="30px" color="white" />
                </button>
              ) : (
                <button onClick={handleLogin}>Войти</button>
              )}
            </form>
            <span className={styles.description}>
              Нет аккаунта?{' '}
              <Link className={styles.reg} to={`/auth/user/registration`}>
                Зарегистрироваться
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
