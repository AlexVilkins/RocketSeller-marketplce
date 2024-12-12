import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';

import styles from './UserBalance.module.scss';

import wallet from '../../assets/wallet.svg';

const UserBalance = ({ open, setPayIsOpen }) => {
  const balance = useSelector((state) => state.balance.balance);

  return (
    <>
      {open ? (
        <div className={styles.balance}>
          <div className={styles.balanceHeader}>
            <div className={styles.title}>
              <div>Баланс</div>
              <img src={wallet} />
            </div>

            <p className={styles.remains}>{balance} ₽</p>
          </div>
          <Tooltip title="Пополнить баланс" placement="bottom">
            <button onClick={() => setPayIsOpen(true)}>Пополнить</button>
          </Tooltip>
        </div>
      ) : (
        <div className={styles.balanceSmall}>
          <Tooltip title="Пополнить баланс" placement="top">
            <img src={wallet} alt="wallet" onClick={() => setPayIsOpen(true)} />
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default UserBalance;
