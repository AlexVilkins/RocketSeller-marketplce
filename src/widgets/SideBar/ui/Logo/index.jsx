import styles from './Logo.module.scss';

import logoSmall from '../../assets/logoSmall.svg';
import logoLarge from '../../assets/logoLarge.svg';

const Logo = ({ open }) => {
  return (
    <>
      {open ? (
        <img src={logoLarge} alt="logo" className={styles.logoLarge} />
      ) : (
        <img src={logoSmall} alt="logo" className={styles.logoSmall} />
      )}
    </>
  );
};

export default Logo;
