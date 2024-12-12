import React from 'react';

import CheckBox from '@shared/ui/CheckBox';
import styles from './Item.module.scss';

const Item = ({ item, handleSelectChange }) => {
  const {
    id,
    category,
    marginPerUnit,
    entryPricePerUnit,
    roi,
    investments,
    unitsToBuy,
    purchaseCny,
    isChecked,
    offerPrice,
  } = item;

  return (
    <tr className={styles.item}>
      <td>
        <CheckBox checked={isChecked} onChange={() => handleSelectChange(id)}>
          {category === '' ? 'Без категории' : category}
        </CheckBox>
        {/* <label className={styles.customCheckbox}>
          <input
            type="checkbox"
            onChange={() => handleSelectChange(id)}
            checked={isChecked}
          />
          <span className={styles.checkmark}></span>
          {category === '' ? 'Без категории' : category}
        </label> */}
      </td>
      <td className={styles.nowrap}>{Math.floor(marginPerUnit)} ₽</td>
      <td
        className={styles.nowrap}
        style={{ color: roi >= 50 ? '#147129' : '#712D14' }}
      >
        {roi} %
      </td>
      <td className={styles.nowrap}>{investments} ₽</td>
      <td className={styles.nowrap}>{unitsToBuy} шт</td>
      <td className={styles.nowrap}>{Math.floor(offerPrice)} ₽</td>
    </tr>
  );
};

export default React.memo(Item); //Item;
