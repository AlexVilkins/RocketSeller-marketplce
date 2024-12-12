import React, { useEffect, useState } from 'react';

import multiIcon from '@assets/multi.png';
import ModalWindow from '@shared/ui/ModalWindow';
import CheckBox from '@shared/ui/CheckBox';
import styles from './PayModal.module.scss';

const PayModal = ({ setPayIsOpen, payIsOpen }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (payIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Проверяем, что введено только положительное целое число или пустая строка
    if (inputValue === '' || /^[1-9]\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };
  return (
    <ModalWindow title="Пополнение счета" onCloseModal={setPayIsOpen}>
      <div className={styles.body}>
        <input
          type="text"
          value={value}
          min="1"
          placeholder="Введите сумму"
          // style={{ paddingLeft: '15px', width: '90%' }}
          onChange={handleChange}
        />
        <div className={styles.panel}>
          <button className={styles.cancel} onClick={() => setPayIsOpen(false)}>
            Отмена
          </button>
          <button className={styles.confirm}>Подтвердить</button>
        </div>
        <div className={styles.privacy}>
          <CheckBox>
            <p>
              Ознакомлен(а) с{' '}
              <span className={styles.underline}>
                Политикой конфиденциальности
              </span>
            </p>
          </CheckBox>
        </div>
      </div>
      <div className={styles.footer}>
        <img src={multiIcon} alt="" />
        <p>
          После подтверждения суммы платежа вы будете <br /> перенаправлены на
          ЮKassa
        </p>
      </div>
    </ModalWindow>
    // <div className={styles.wraper}>
    //   <div className={styles.container}>
    //     <header>
    //       <h1>Пополнение счета</h1>
    //       <img
    //         onClick={() => setPayIsOpen(false)}
    //         src={closeIcon}
    //         alt="close pay window"
    //       />
    //     </header>
    //     <body>
    //       <input
    //         type="text"
    //         value={value}
    //         min="1"
    //         placeholder="Введите сумму"
    //         style={{ paddingLeft: '15px', width: '90%' }}
    //         onChange={handleChange}
    //       />
    //       <div className={styles.panel}>
    //         <button
    //           className={styles.cancel}
    //           onClick={() => setPayIsOpen(false)}
    //         >
    //           Отмена
    //         </button>
    //         <button className={styles.confirm}>Подтвердить</button>
    //       </div>
    //       <div className={styles.privacy}>
    //         <label className={styles.customCheckbox}>
    //           <input
    //             type="checkbox"
    //             // onChange={handleSelectChange}
    //             value={true}
    //           />
    //           <span className={styles.checkmark}></span>
    //         </label>
    //         {/* <input type="checkbox" /> */}
    //         <p>
    //           Ознакомлен(а) с{' '}
    //           <span className={styles.underline}>
    //             Политикой конфиденциальности
    //           </span>
    //         </p>
    //       </div>
    //     </body>
    //     <footer>
    //       <img src={multiIcon} alt="" />
    //       <p>
    //         После подтверждения суммы платежа вы будете <br /> перенаправлены на
    //         ЮKassa
    //       </p>
    //     </footer>
    //   </div>
    // </div>
  );
};

export default PayModal;
