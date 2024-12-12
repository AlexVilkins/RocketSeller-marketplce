import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PriceFilter = ({ products, onFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const min = minPrice !== '' ? parseFloat(minPrice) : 0;
    const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;

    if (max === 0) {
      onFilter([]); //показываем сообщение "Товары по вашему запросу не найдены"
    } else {
      const filteredProducts = products.filter((product) => {
        const price = product.price;
        return price >= min && price <= max;
      });

      onFilter(filteredProducts);
    }
  }, [minPrice, maxPrice, onFilter]);

  return (
    <div
      style={{
        display: 'flex',
        padding: '8px 15px',
        borderRadius: '8px',
        backgroundColor: '#f2f4f7',
      }}
    >
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div>
          <label style={{ fontSize: '12px' }}>Цена, руб.&nbsp;</label>
          <input
            type="text"
            id="minPrice"
            style={{ width: '80px', border: 'none' }}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="От"
          />
        </div>
        <div>
          <label></label>
          <input
            type="text"
            id="maxPrice"
            style={{ width: '80px', border: 'none' }}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="До"
          />
        </div>
      </div>
    </div>
  );
};

PriceFilter.propTypes = {
  products: PropTypes.any, // TODO: указать верные типы
  onFilter: PropTypes.any,
};

export default PriceFilter;
