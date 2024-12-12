import Item from './Item';

import styles from './Table.module.scss';

const Table = ({ headers, items }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
