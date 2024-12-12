import React from 'react';

import Item from '../Item';
import CheckBox from '@shared/ui/CheckBox';
import styles from './Table.module.scss';
const TableWithCombobox = ({
  items,
  handleSelectChange,
  isAllChecked,
  handleCheckALL,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <CheckBox
              checked={isAllChecked}
              onChange={() => handleCheckALL(isAllChecked)}
            >
              Товар
            </CheckBox>
          </th>
          {/* <th>Товар</th> */}
          <th>Маржа на ед., руб.</th>
          <th>ROI</th>
          <th>Инвестиции на запуск, руб.</th>
          <th>Количество к закупке, шт.</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            handleSelectChange={handleSelectChange}
          />
        ))}
      </tbody>

      {/* <tbody> */}
      {/* {basketStatus === 'loading' && (
          <td colSpan="6">
            <ContentLoader
              speed={2}
              width={1080}
              height={50}
              viewBox="0 0 1080 50"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="1" y="NaN" rx="0" ry="0" width="180" height="NaN" />
              <rect x="12" y="NaN" rx="0" ry="0" width="131" height="NaN" />
              <rect x="0" y="0" rx="20" ry="20" width="1080" height="50" />
            </ContentLoader>
          </td>
        )} */}
      {/* </tbody> */}
    </table>
  );
};

export default React.memo(TableWithCombobox); //TableWithCombobox;
