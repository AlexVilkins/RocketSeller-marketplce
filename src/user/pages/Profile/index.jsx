import avatarIcon from '@assets/avatarr.png';
import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={styles.container}>
      <h3>Профиль</h3>

      <div className={styles.avatar}>
        <img src={avatarIcon} alt="avatar" />

        <div className={styles.info}>
          <p className={styles.text}>Фото</p>
          <p className={styles.description}>Выберите фото размером до 4МБ</p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.form}>
          <h4>Общая информация</h4>
          <p>Фамилия</p>
          <input type="text" value="Lyzerov" />
          <p>Имя</p>
          <input type="text" value="User" />
          <p>Отчество</p>
          <input type="text" value="Adminovich" />
        </div>
        <div className={styles.form}>
          <h4>Общая информация</h4>
          <p>Email</p>
          <input type="email" value="lyzers@example.com" />
          <p>Телефон</p>
          <input type="phone" placeholder="+7 (___) ___-__-__" required />
          <p>Семенить пароль</p>
          <button className={styles.button}>Сменить пароль</button>
        </div>
        <div className={styles.rightItem}>
          <button className={styles.cancelButton}>Отменить</button>
          <button className={styles.button}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
