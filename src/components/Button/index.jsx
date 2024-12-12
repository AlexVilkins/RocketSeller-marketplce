import { Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({ title, text, img, onClick, disabled }) => {
  return (
    <Tooltip title={title}>
      <button
        className={`${styles.button} ${
          disabled ? styles.disable : styles.active
        } `}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
        {img && <img src={img} alt="image" />}
      </button>
    </Tooltip>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  img: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
