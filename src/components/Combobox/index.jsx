import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import close from '@assets/table/close.svg';
import filterDown from '@assets/table/filterDown.svg';
import filterUp from '@assets/table/filterUp.svg';

import { Tooltip } from 'antd';
import styles from './Combobox.module.scss';

const Combobox = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const comboboxRef = useRef(null);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredOptions = options.filter((option) => {
    // return true;
    return option?.name?.toLowerCase().includes(filter.toLowerCase());
  });

  const handleClickOutside = (event) => {
    if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const dropFilter = (e) => {
    e.stopPropagation();
    setSelectedOption('');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelect} ref={comboboxRef} style={style}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {Object.keys(selectedOption).length > 1 && (
          <Tooltip title="Очистить поле" placement="top">
            <img src={close} alt="Combobox Off" onClick={dropFilter} />
          </Tooltip>
        )}
        {selectedOption.name || title || options[0].name}
        <img src={isOpen ? filterUp : filterDown} alt="filterImg" />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          <input
            type="text"
            placeholder="Поиск..."
            className={styles.input}
            value={filter}
            onChange={handleInputChange}
          />
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelectChange(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Combobox.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.object,
  setSelectedOption: PropTypes.func,
  style: PropTypes.object,
};

export default Combobox;
