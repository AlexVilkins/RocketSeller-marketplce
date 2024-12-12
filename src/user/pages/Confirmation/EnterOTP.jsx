import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input/Input';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthApi from '../../../widgets/auth/api';
import styles from './Confirmation.module.scss';
import { confirmOTP, refreshOTP } from './api';
import settings from './assets/settings.svg';

const EnterOTP = () => {
  const [code, setCode] = useState('');
  const [sentError, setSentError] = useState(null);

  const { logout } = useAuthApi();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const enterOTPCode = (e) => {
    console.log(e.target.value);
    setCode(e.target.value);
  };

  const sentOTP = async (e) => {
    e.preventDefault();
    const response = await confirmOTP(code);
    if (response?.type == 'error') {
      setTimeout(() => setSentError(null), 3000);
      setSentError(response.message);
    } else {
      logout();
      enqueueSnackbar('Теперь вы можете войти в систему', {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      navigate('/');
    }
  };

  const setRefreshOTP = async () => {
    const response = await refreshOTP();
    enqueueSnackbar('Вам на почту отправлен новый код', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  return (
    <div className={styles.confirmWrapper}>
      <div className={styles.confirmContent}>
        <h3>Чтобы продолжить работу, необходимо подтвердить почту</h3>
        <div className={styles.confirmContentImg}>
          <img src={settings} />
        </div>

        <div className={styles.confirmContentForm}>
          <form onSubmit={sentOTP}>
            <Input
              value={code}
              placeholder="Введи код, отправленный на почту"
              error={sentError}
              handleInput={(e) => enterOTPCode(e)}
            />
            <Button type="submit" text="Отправить" />
          </form>

          <p className={styles.confirmRefresh} onClick={setRefreshOTP}>
            <span> Отправить код повторно</span>
          </p>
          <div
            onClick={() => {
              logout();
              navigate('/');
            }}
            style={{ marginTop: '50px', fontSize: '20px', textAlign: 'center' }}
          >
            Выйти
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOTP;
