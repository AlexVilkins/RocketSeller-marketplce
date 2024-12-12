import { CircularProgress } from '@mui/material';
import React from 'react';
import styles from './ProgressComponent.module.scss';

const ProgressComponent = ({ title }) => {
  return (
    <div className={styles.progress}>
      <div style={{ textAlign: 'center' }}>{title}</div>
      <CircularProgress size="40px" />
    </div>
  );
};

export default ProgressComponent;
