import styles from './SignHeader.module.scss';
import logoIcon from '@assets/sidebar/rocketseller-logo.png';

const SignHeader = () => {
  return (
    <div className={styles.container}>
      <img src={logoIcon} alt="logo" className={styles.logo} />
      <div className={styles.fields}>
        <p>Возможности</p>
        <p>О сервисе</p>
        <p>Контакты</p>
      </div>
    </div>
  );
};

export default SignHeader;
