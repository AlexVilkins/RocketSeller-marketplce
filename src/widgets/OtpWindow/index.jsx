import React, { useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { confirmOTP, refreshOTP } from '@user/pages/Confirmation/api';
import styles from './OtpWindow.module.scss';
import useAuthApi from '@widgets/auth/api';
import ModalWindow from '@shared/ui/ModalWindow';

import closeIcon from '@assets/table/close.svg';

const OtpWindow = () => {
  const duration = 60;
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const radius = 50; // Радиус круга
  const circumference = 2 * Math.PI * radius; // Длина окружности
  const offset = circumference - (secondsLeft / duration) * circumference; // Смещение
  const [values, setValues] = useState(Array(8).fill(''));
  const [sentError, setSentError] = useState(null);
  const [isActiveWindowOpen, setIsActiveWindowOpen] = useState(false);

  const { userRefresh } = useAuthApi();
  const { logout } = useAuthApi();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const inputs = useRef([]);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [secondsLeft]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Проверяем ввод: только 0-9 или пустая строка
    if (/^[0-9]?$/.test(value)) {
      // Обновляем значение в массиве
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Переход к следующему полю
      if (value.length === 1 && index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
      // Переход к предыдущему полю
      // else if (value.length === 0 && index > 0) {
      //   inputs.current[index - 1].focus();
      // }
    } else {
      e.target.value = ''; // Очищаем поле, если введено некорректное значение
    }
  };

  // const sentOTP = () => {
  //   console.log(values.join(''));
  // };

  const sentOTP = async (e) => {
    e.preventDefault();

    const response = await confirmOTP(values.join(''));
    if (response?.type == 'error') {
      setTimeout(() => setSentError(null), 3000);
      // setSentError(response.message);
      enqueueSnackbar('Ошибка OTP кода', {
        variant: 'error',
        autoHideDuration: 2000,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } else {
      setIsActiveWindowOpen(true);
    }
  };

  const setRefreshOTP = async () => {
    const response = await refreshOTP();
    enqueueSnackbar('Вам на почту отправлен новый код', {
      variant: 'success',
      autoHideDuration: 2000,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
    setSecondsLeft(60);
  };

  const handleCotinueClick = async () => {
    setIsActiveWindowOpen(false);
    await userRefresh();
    navigate('/user/main');
  };

  return (
    <div className={styles.wraper}>
      {isActiveWindowOpen && (
        <ModalWindow
          title="Поздравляем!"
          onCloseModal={() => setIsActive(false)}
        >
          <p className={styles.helloTitle}>
            Ваш аккаунт успешно создан и подтвержден. Приступайте к работе и
            наслаждайтесь процессом
          </p>
          <button onClick={handleCotinueClick} className={styles.helloButton}>
            Подтвердить
          </button>
        </ModalWindow>
      )}
      <div className={styles.container}>
        <header>
          <h1>Регистрация завершена! </h1>
          <p className={styles.text}>
            Ваш аккаунт успешно создан. Перед тем, как пользоваться
            возможностями своего аккаунта, активируйте его. Мы отправили код
            активации на ваш электронный адрес. В течение пары минут на
            указанный почтовый адрес придет сообщение с кодом подтверждения.
          </p>
        </header>
        <body>
          <div className={styles.otpСontainer}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={styles.otpInput}
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => e.key == 'Enter' && sentOTP(e)}
                />
              ))}
          </div>
          <p className={styles.text}>
            Если код не приходит на почту, попробуйте отправить его повторно. Мы
            гарантируем скорейшую доставку!
          </p>
        </body>
        <footer>
          <div className={styles.circularTimer}>
            <svg width="120" height="120" transform="rotate(-90)">
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="white"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#C6C7F8"
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div className={styles.timerText}>{secondsLeft} с</div>
          </div>
          <button className={styles.resend} onClick={setRefreshOTP}>
            Повторно отправить код
          </button>
          <button className={styles.confirm} onClick={sentOTP}>
            Подтвердить
          </button>
        </footer>
        <button
          className={styles.close}
          onClick={() => {
            logout();
            navigate('/auth/');
          }}
        >
          <img src={closeIcon} alt="close OTP window" />
        </button>
      </div>
    </div>
  );
};

export default OtpWindow;
