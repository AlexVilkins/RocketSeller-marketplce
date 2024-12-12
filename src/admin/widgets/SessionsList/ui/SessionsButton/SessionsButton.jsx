import historyIcon from '@assets/collecting/history.svg';
import { Tooltip } from '@mui/material';
import React from 'react';
import styles from './SessionsButton.module.scss';

const SessionsButton = ({ toogleComponent }) => {
  return (
    <Tooltip title="История сессий">
      <button onClick={toogleComponent} className={styles.toggleButton}>
        <img src={historyIcon} alt="history" />
      </button>
    </Tooltip>
  );
};

export default SessionsButton;
