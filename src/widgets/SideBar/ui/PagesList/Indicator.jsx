import sideBarClose from '../../assets/sideBarClose.svg';
import sideBarOpen from '../../assets/sideBarOpen.svg';
import styles from './PagesList.module.scss';

const Indicator = ({ open, setSidebarIsOpen, activeIndex }) => {
  return (
    <div
      className={styles.indicator}
      onClick={() => setSidebarIsOpen(!open)}
      style={{ transform: `translateY(${activeIndex * 50}px)` }}
    >
      <img src={open ? sideBarClose : sideBarOpen} alt="select page" />
    </div>
  );
};

export default Indicator;
