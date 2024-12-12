import React, { useState, useEffect } from 'react';

import closeIcon from '@user/assets/close.svg';
import styles from './ModalWindow.module.scss';

const ModalWindow = ({ title = '', onCloseModal, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false); // Убираем окно при размонтировании
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onCloseModal(false);
    }, 300);
  };

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.open : styles.close}`}>
      <div
        className={`${styles.container} ${isOpen ? styles.open : styles.close}`}
      >
        <header className={styles.header}>
          <h1>{title}</h1>
          <button onClick={handleClose}>
            <img src={closeIcon} alt="close window" />
          </button>
        </header>
        <body>{children[0]}</body>
        <footer>{children[1]}</footer>
      </div>
    </div>
  );
};

export default React.memo(ModalWindow);
