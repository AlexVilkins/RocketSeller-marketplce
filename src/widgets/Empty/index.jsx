import styles from './Empty.module.scss';

// - Если кнопка не нужна, просто не передавать параметр buttonText
// - Ecли не нужен title, просто не передавать
// - Если кнопка серая передавать параметр buttonColor="grey",
//        для других цветов передавать что угодно кроме "grey"

const Empty = ({
  icon,
  title = '',
  text,
  buttonText = '',
  buttonColor = 'grey',
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <img src={icon} alt="empty table icon" />
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text} </p>
      <button
        className={
          buttonText === ''
            ? styles.buttonDisabled
            : buttonColor === 'grey'
              ? styles.buttonGrey
              : styles.buttonPurple
        }
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Empty;
