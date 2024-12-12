import styles from './Undefined.module.scss';
import logo from './assets/rocket.svg';

const Undefined = () => {
  return (
    <div className={styles.undef}>
      <p className={styles.title}>
        4
        <p>
          <img src={logo} alt="error" />
        </p>
        4
      </p>

      <h1>Страница не найдена!</h1>
    </div>
  );
};

export default Undefined;
