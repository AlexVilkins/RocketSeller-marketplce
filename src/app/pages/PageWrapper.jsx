import React, { useState } from 'react';
import { Sidebar } from '@widgets/SideBar';
import styles from './pageWrapper.module.scss';

const PageWrapper = ({ children }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  return (
    <div className={styles.container}>
      <Sidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <div className={sidebarIsOpen ? styles.contentOpen : styles.contentClose}>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
