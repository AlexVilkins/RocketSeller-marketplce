import React from 'react';
import bookIcon from '../../assets/book.png';
import styles from './EmptySessions.module.scss';

const EmptySessions = () => {
  return (
    <div className={styles.emptyHistory}>
      <img src={bookIcon} alt="emptyHistory" />
      <p>Нет записей в истории</p>
    </div>
  );
};

export default EmptySessions;
