import PropTypes from 'prop-types';

import { Combobox, PriceFilter } from '@components';

const customFilterStyle = {
  margin: '0px',
  marginBottom: '10px',
  fontSize: '12px',
  padding: '0px',
  height: '30px',
};

const searchStyle = {
  marginBottom: '10px',
  fontSize: '12px',
  paddingLeft: '10px',
  height: '33px',
  border: 'none',
  backgroundColor: '#f2f4f7',
  borderRadius: '8px',
  outline: 'none',
  color: '#344054',
};

const FiltersAnalogTable = ({ handleInputChange, products, onFilter }) => {
  const setFilterCategory = () => {
    // console.log('sd');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '5px',
        marginTop: '10px',
        alignItems: 'flex-start',
      }}
    >
      <PriceFilter products={products} onFilter={onFilter} />
      <Combobox
        title="Категория"
        options={[{ name: 'S' }, { name: 's' }, { name: 'ff' }]}
        selectedOption={1}
        setSelectedOption={setFilterCategory}
        style={{ ...customFilterStyle, display: 'none' }}
      />
      <Combobox
        title="Статус"
        options={[{ name: 'S' }, { name: 's' }, { name: 'ff' }]}
        selectedOption={1}
        setSelectedOption={setFilterCategory}
        style={{ ...customFilterStyle }}
      />
      <input
        placeholder="Поиск в таблице..."
        style={{ ...searchStyle }}
        onChange={handleInputChange}
      />
    </div>
  );
};

FiltersAnalogTable.propTypes = {
  sessionId: PropTypes.string,
  handleInputChange: PropTypes.func,
  products: PropTypes.any, // TODO: указать верные типы
  onFilter: PropTypes.any,
};

export default FiltersAnalogTable;
