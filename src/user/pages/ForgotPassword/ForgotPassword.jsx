import { useState } from 'react';

import loginSvg from '@assets/auth/Login_Register.svg';
import styles from './ForgotPassword.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  
  const navigate = useNavigate();

  const sendPasswordRecovery = async (e) => {
    e.preventDefault();
    console.log('Ссылка для восстановления пароля отправлена');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.decorWrapper}>
            <div className={styles.textWrapper}>
              <h3 className={styles.title}>Забыли пароль?</h3>
              <p className={styles.text}>
                Не волнуйтесь, мы вышлем ссылку
                <br />
                для восстановления пароля вам на
                <br />
                почту
              </p>
            </div>
            <img className={styles.svg} src={loginSvg} alt="line" />
          </div>
          <div className={styles.panel}>
            <form onSubmit={sendPasswordRecovery} className={styles.form}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={sendPasswordRecovery}>Отправить</button>
            </form>
            <span className={styles.description}>
            Вспомнили пароль?{' '}
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

export default ForgotPassword;
