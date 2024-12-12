import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './SideBar.module.scss';
import Logo from './ui/Logo';

// import collecting from '@assets/sidebar/collecting.png';

// import icons from './svg';
// import sideBarClose from './assets/sideBarClose.svg';
// import sideBarOpen from './assets/sideBarOpen.svg';

import PayModal from '@user/pages/PayModal';
import { useDispatch } from 'react-redux';
import { getBalance } from '@redux/balance/asyncAction';
import ROLES from '@shared/utils/session/userRoles';
import useSession from '@shared/utils/session/useSession';
import UserInfo from './ui/UserInfo';
import UserBalance from './ui/UserBalance';
import PagesList from './ui/PagesList';

const Sidebar = ({ sidebarIsOpen, setSidebarIsOpen }) => {
  // const [active, setActive] = useState('');
  const [payIsOpen, setPayIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { getUserRole } = useSession();
  const role = getUserRole();

  // useEffect(() => {
  //   const pathname = location.pathname;
  //   const lastSlashIndex = pathname.lastIndexOf('/');

  //   if (lastSlashIndex !== -1) {
  //     const lastPart = pathname.substring(lastSlashIndex);
  //     setActive(lastPart);
  //   }

  //   if (pathname.includes('/main')) {
  //     setActive('/main');
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    async function refreshBalance() {
      dispatch(await getBalance());
    }
    refreshBalance();
  }, []);

  // const menuLinkClick = (path) => {
  //   setActive(path);
  // };

  return (
    <div className={sidebarIsOpen ? styles.sidebarOpen : styles.sidebarClose}>
      <Logo open={sidebarIsOpen} />

      <PagesList
        role={role}
        open={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      {role !== ROLES.ADMIN && (
        <UserBalance open={sidebarIsOpen} setPayIsOpen={setPayIsOpen} />
      )}

      <UserInfo open={sidebarIsOpen} />

      {payIsOpen && (
        <PayModal setPayIsOpen={setPayIsOpen} payIsOpen={payIsOpen} />
      )}
    </div>
  );
};

export default Sidebar;
