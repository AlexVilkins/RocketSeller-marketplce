import React from 'react';
import styles from './Input.module.scss';

const Input = ({ value, placeholder, handleInput, error }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
        className={styles.inputComponent}
      />
      <div className={styles.errorWrapper}>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default Input;
