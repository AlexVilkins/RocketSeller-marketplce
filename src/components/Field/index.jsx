import PropTypes from 'prop-types';

import styles from './Field.module.scss';

const Field = ({ title, text }) => {
  return (
    <div className={styles.container}>
      <h6 className={styles.title}>{title}</h6>
      <div className={styles.body}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

Field.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Field;
