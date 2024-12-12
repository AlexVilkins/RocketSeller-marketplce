import { Tooltip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ROLES from '@shared/utils/session/userRoles';
import useAuthApi from '@widgets/auth/api';
import styles from './UserInfo.module.scss';
import UserEmailUI from './UserEmailUI';

import logoutImg from '../../assets/logout.svg';
import logoutSmall from '../../assets/logoutSmall.svg';
import userFallback from '@assets/userFallback.png';

const UserInfo = ({ open }) => {
  const { logout } = useAuthApi();
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  const userRole = localStorage.getItem('status');

  const logoutHandler = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className={styles.info}>
      {userRole === ROLES.ADMIN ? (
        <div className={styles.admin}>
          {open ? (
            <div className={styles.open}>
              <p className={styles.adminName}>Admin</p>

              <Tooltip title="Выйти" placement="top">
                <button className={styles.logout} onClick={logoutHandler}>
                  <img src={logoutImg} alt="logout" />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className={styles.close}>
              <Tooltip title="Выйти" placement="top">
                <button className={styles.logout} onClick={logoutHandler}>
                  <img src={logoutImg} alt="logout" />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.user}>
          {open ? (
            <div className={styles.open}>
              <img src={userFallback} alt="Photo" className={styles.avatar} />
              <div>
                <p className={styles.title}>
                  {userName ? userName : 'Пользователь'}
                </p>
                <p className={styles.text}>
                  <UserEmailUI />
                </p>
              </div>
              <Tooltip title="Выйти" placement="top">
                <button className={styles.logout} onClick={logoutHandler}>
                  <img src={logoutImg} alt="logout" />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className={styles.close}>
              <img
                src={userFallback}
                alt="Photo"
                className={styles.avatarSmall}
              />
              <Tooltip title="Выйти" placement="top">
                <button className={styles.logout}>
                  <img src={logoutSmall} alt="logout" onClick={logoutHandler} />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
