import { CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginSvg from '@assets/auth/Login_Register.svg';
import useAuthApi from '../../../widgets/auth/api';
import styles from './Registration.module.scss';
import { registration } from './api';
const UserRegistration = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { userLogin } = useAuthApi();
  const navigate = useNavigate();

  const validation = () => {
    if (password !== confirmPassword)
      return {
        state: true,
        message: 'Пароли не совпадают',
      };

    if (password.length < 8) {
      return {
        state: true,
        message: 'Длина пароля должна быть не меньше 8 символов',
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        state: true,
        message: 'Пароль должен содержать завглавную букву',
      };
    }

    if (!/[a-z]/.test(password)) {
      return { state: true, message: 'Пароль должен содержать строчную букву' };
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      return {
        state: true,
        message: 'Пароль должен содержать специальный символ',
      };
    } else
      return {
        state: false,
        message: '',
      };
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    const { state, message } = validation();

    if (!state) {
      try {
        setLoading(true);
        const response = await registration({
          login: name,
          password: password,
          repeatPassword: confirmPassword,
        });
        // console.log(response);
        // enqueueSnackbar('Вы успешно создали учетную запись', {
        //   variant: 'success',
        //   anchorOrigin: { vertical: 'top', horizontal: 'right' },
        // });
        await userLogin({ name: name, password: password });
        navigate(`/user/confirm`);
      } catch (error) {
        enqueueSnackbar(error.response.data.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      } finally {
        setLoading(false);
      }
    } else {
      enqueueSnackbar(message, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const handleCotinue = () => {};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
        <div className={styles.decorWrapper}>
            <div className={styles.textWrapper}>
            <h3 className={styles.title}>Нет аккаунта?</h3>
          <p className={styles.text}>
            Зарегистрируйтесь для начала работы
          </p>
            </div>
            <img className={styles.svg} src={loginSvg} alt="line" />
          </div>
          <div className={styles.panel}>
            <form onSubmit={handleRegistration} className={styles.form}>
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
              <input
                type="password"
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {loading ? (
                <button>
                  <CircularProgress size="30px" color="white" />
                </button>
              ) : (
                <button onClick={handleRegistration}>Зарегистрироваться</button>
              )}
            </form>
            <span className={styles.description}>
              Уже есть аккаунт?
              <Link className={styles.reg} to={`/auth/user/login`}>
                Войти
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistration;
