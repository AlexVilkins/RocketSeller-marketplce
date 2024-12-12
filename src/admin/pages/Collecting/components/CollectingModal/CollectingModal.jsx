import { Button } from '@components';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import styles from './CollectingModal.module.scss';

const CollectingModal = ({ handleSessionName, setCollect, delInputs }) => {
  const [open, setOpen] = useState(false);
  const [sessionName, setSessionNameLocally] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => {
    setOpen(true);
    setCollect(true);
  };
  const handleClose = () => {
    delInputs();
    setOpen(false);
    setError('');
    setSessionNameLocally('');
    setCollect(false);
  };

  const handleConfirm = () => {
    if (sessionName.trim().length < 1) {
      setError('Минимальное количество символов: 1');
    } else {
      handleSessionName(sessionName);
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    setSessionNameLocally(e.target.value);
    if (e.target.value.trim().length >= 1) {
      setError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        text="Cобрать"
        title="Отправить артикулы для сбора"
      />
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.modalBox}>
          <button className={styles.closeButton} onClick={handleClose}>
            <CloseIcon />
          </button>
          <Typography className={styles.modalTitle} variant="h6" component="h2">
            Введите имя сессии
          </Typography>
          <div className={styles.inputWrapper}>
            <input
              value={sessionName}
              onChange={handleInputChange}
              className={styles.modalInput}
              onKeyUp={handleKeyPress}
              placeholder='Например "Техника"'
            />
            <div className={styles.errorWrapper}>
              {error && <p className={styles.errorMessage}>{error}</p>}
            </div>
          </div>
          <button className={styles.modalButton} onClick={handleConfirm}>
            Подтвердить
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default CollectingModal;
