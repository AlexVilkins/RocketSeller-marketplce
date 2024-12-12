import { Link } from 'react-router-dom';

import styles from './PagesList.module.scss';

const CustomLi = ({ object, active, menuLinkClick }) => {
  const { activate, linkTo, text, icon } = object;

  return (
    <li
      className={active === activate ? styles.active : ''}
      onClick={() => menuLinkClick(activate)}
    >
      <Link to={linkTo} className={styles.link}>
        {icon}
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default CustomLi;
