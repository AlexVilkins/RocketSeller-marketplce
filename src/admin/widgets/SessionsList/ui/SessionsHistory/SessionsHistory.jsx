import check from '@assets/table/check.svg';
import { Tooltip } from '@mui/material';
import {
  getSessionInfo,
  getSessionProducts,
} from '@redux/sessionSlice/asyncAction';
import { setCurrentSession } from '@redux/sessionSlice/slice';
import { formateDate, formateTime } from '@utils/currentDateFormat';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './SessionsHistory.module.scss';

const SessionsHistory = ({
  sessions,
  selectSession,
  selectedSession,
  setSelectedSession,
}) => {
  const dispatch = useDispatch();

  const handleClick = async (id, status) => {
    setSelectedSession(id);
    dispatch(await getSessionInfo(id));
    if (status == 'successed') {
      dispatch(
        await getSessionProducts({ limit: 10, offset: 0, sessionId: id })
      );
    }
    setCurrentSession(id);
    selectSession();
  };

  return (
    <>
      {sessions.map((item) => (
        <div key={item.id} className={styles.sessiaWrapper}>
          {item.status === 'successed' ? (
            <img src={check} alt="redy" />
          ) : (
            <div className={styles.loader}></div>
          )}
          <li
            className={`${styles.sessia} ${
              selectedSession == item.id ? styles.clicked : ''
            }`}
            onClick={() => handleClick(item.id, item.status)}
          >
            <Tooltip title={item.name}>
              <div className={styles.sessionContainer}>
                {'Сессия: '}
                {item.name || item.id.slice(0, 5)}
              </div>
            </Tooltip>

            <div>
              <p className={styles.time}>{formateTime(item.doneAt)}</p>
              <p className={styles.date}>{formateDate(item.doneAt)}</p>
            </div>
          </li>
        </div>
      ))}
    </>
  );
};

export default SessionsHistory;
