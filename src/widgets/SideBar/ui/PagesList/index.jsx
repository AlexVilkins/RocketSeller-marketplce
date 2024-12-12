import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import icons from './svg';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';
import CustomLi from './CustomLi';
import Indicator from './Indicator';
// import sideBarClose from '../../assets/sideBarClose.svg';
// import sideBarOpen from '../../assets/sideBarOpen.svg';

import ROLES from '@shared/utils/session/userRoles';
import styles from './PagesList.module.scss';

const PagesList = ({ role, open, setSidebarIsOpen }) => {
  const [active, setActive] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const pathname = location.pathname;
    const lastSlashIndex = pathname.lastIndexOf('/');

    if (lastSlashIndex !== -1) {
      const lastPart = pathname.substring(lastSlashIndex);
      setActive(lastPart);
    }

    if (pathname.includes('/main')) {
      setActive('/main');
    }
  }, [location.pathname]);

  const menuLinkClick = (activate, index) => {
    setActive(activate);
    setActiveIndex(index); // Обновляем индекс активного элемента
  };

  return (
    <div className={open ? styles.open : styles.close}>
      {role === ROLES.ADMIN ? (
        <div className={styles.uiContainer}>
          <ul>
            {adminRoutes.map((item, index) => (
              <CustomLi
                key={index}
                object={item}
                active={active}
                menuLinkClick={() => menuLinkClick(item.activate, index)}
                open={open}
                setSidebarIsOpen={setSidebarIsOpen}
              />
            ))}
            {/* <li className={active === '/collecting' ? styles.active : ''}>
            <Link
              to="/admin/collecting"
              className={styles.link}
              onClick={() => menuLinkClick('/collecting')}
            >
              {icons.collecting}
              <p>Сбор товаров</p>
            </Link>
            <div
              className={styles.indicator}
              onClick={() => setSidebarIsOpen(!open)}
            >
              <img src={open ? sideBarClose : sideBarOpen} alt="select page" />
            </div>
          </li> */}
          </ul>
          <Indicator
            open={open}
            setSidebarIsOpen={setSidebarIsOpen}
            activeIndex={activeIndex}
          />
        </div>
      ) : (
        <div className={styles.uiContainer}>
          <ul>
            {userRoutes.map((item, index) => (
              <CustomLi
                key={index}
                object={item}
                active={active}
                menuLinkClick={() => menuLinkClick(item.activate, index)}
                open={open}
                setSidebarIsOpen={setSidebarIsOpen}
              />
            ))}
          </ul>
          <Indicator
            open={open}
            setSidebarIsOpen={setSidebarIsOpen}
            activeIndex={activeIndex}
          />
        </div>
      )}
    </div>
  );
};

export default PagesList;
