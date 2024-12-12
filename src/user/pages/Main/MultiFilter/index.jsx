import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '@assets/table/close.svg';
import filterDown from '@assets/table/filterDown.svg';
import filterUp from '@assets/table/filterUp.svg';
import { Slider } from '@mui/material';
import { setFilter } from '@redux/filter/slice';

// import { getUserFiltersRange } from '@redux/filter/asyncAction';
import { Tooltip } from 'antd';
import styles from './MultiFilter.module.scss';
import { validationSchema } from './validationSchema';

const MultiFilter = ({ settings }) => {
  const {
    key,
    label,
    hasInterval,
    hasSearch,
    value,
    selected,
    step,
    symbol,
    changed,
    error,
  } = settings;

  const [isOpen, setIsOpen] = useState(false);
  const [filterState, setFilterState] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [errors, setErrors] = useState({
    minPrice: '',
    maxPrice: '',
  });
  const [panelStyle, setPanelStyle] = useState({});

  const minDistance = 10;

  const comboboxRef = useRef(null);
  const elementRef = useRef(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!changed) {
  //     console.log('called');
  //     dispatch(getUserFiltersRange());
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('isOpen', isOpen);
  // }, [isOpen]);

  const filters = useSelector((state) => state.filter.filtersList);
  const currentSettings = filters[settings.key];

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const isOut =
        // rect.top < 0 ||
        // rect.bottom > window.innerHeight ||
        // rect.left < 0 ||
        rect.right > window.innerWidth;

      console.log('rightPanel', rect.right, 'windowRight', window.innerWidth);

      if (isOut) {
        setPanelStyle({
          transform: `translateX(-${rect.right - window.innerWidth + 20}px)`,
        });
      }
    }
  }, [isOpen]);

  const validate = (e, minPrice, maxPrice) => {
    validationSchema
      .validate({ minPrice, maxPrice })
      .then(() => {
        setErrors({ minPrice: '', maxPrice: '' });
        dispatch(setFilter({ key, fiild: 'error', value: false }));
      })
      .catch((err) => {
        setErrors({ ...errors, [err.path]: err.message });
        dispatch(setFilter({ key, fild: 'error', value: true }));
      });
  };

  const handleSelectChange = useCallback(
    (option) => {
      setFilterState(option);
      setSelectedIndex(-1);
      setSelectedOption(option);
      dispatch(setFilter({ key, fild: 'selected', value: option }));
      dispatch(setFilter({ key, fild: 'changed', value: true }));
      setIsOpen(false);
    },
    [dispatch, key]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredOptions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        handleSelectChange(filteredOptions[selectedIndex].name);
      }
    }
  };

  const handleInputChange = (event) => {
    setFilterState(event.target.value);
    setSelectedIndex(-1);
  };

  const filteredOptions = useMemo(
    () =>
      value.filter((item) => {
        return (
          typeof item.name === 'string' &&
          item.name.toLowerCase().includes(filterState.toLowerCase())
        );
      }),
    [value, filterState]
  );

  const handleClickOutside = useCallback(
    (event) => {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [comboboxRef]
  );

  const dropFilter = (e) => {
    e.stopPropagation();

    const defaultValue = filters[key].value;

    // typeof selected === 'string'
    //   ? dispatch(setFilter({ key, fild: 'selected', value: '' }))
    //   : dispatch(setFilter({ key, fild: 'selected', value }));
    typeof selected === 'string'
      ? dispatch(setFilter({ key, fild: 'selected', value: '' }))
      : dispatch(setFilter({ key, fild: 'selected', value: defaultValue }));

    dispatch(setFilter({ key, fild: 'changed', value: false }));
    dispatch(setFilter({ key, fild: 'error', value: false }));
    setErrors({ minPrice: '', maxPrice: '' });
    setFilterState('');
    setSelectedIndex(-1);
  };

  const handleChange = useCallback(
    (event, newValue) => {
      dispatch(setFilter({ key, fild: 'changed', value: true }));
      dispatch(setFilter({ key, fild: 'selected', value: newValue }));
    },
    [minDistance]
  );

  return (
    <div className={styles.customSelect} ref={comboboxRef}>
      <div
        className={`${changed ? styles.changed : styles.noBorder} ${styles.selected}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {typeof selected === 'string'
          ? selected || label
          : selectedOption || label}
        {changed ? (
          <Tooltip title="Очистить поле" placement="top">
            <img src={closeIcon} alt="Combobox Off" onClick={dropFilter} />
          </Tooltip>
        ) : (
          <img src={isOpen ? filterUp : filterDown} alt="filterImg" />
        )}
      </div>
      {isOpen &&
        (hasInterval ? (
          <div className={styles.panel} ref={elementRef} style={panelStyle}>
            <Slider
              getAriaLabel={() => 'Minimum distance shift'}
              // value={selected}
              value={currentSettings.selected}
              onChange={handleChange}
              valueLabelDisplay="auto"
              disableSwap
              min={currentSettings.value[0] < 0 ? 0 : currentSettings.value[0]}
              step={currentSettings.step}
              max={currentSettings.value[1]}
              // min={value[0]}
              // step={step}
              // max={value[1]}
              size="small"
              sx={{
                width: '96%',
                color: '#6C63FFCC',

                '& .MuiSlider-thumb': {
                  width: 17,
                  height: 17,
                },

                '& .MuiSlider-track': {
                  height: 4,
                },

                '& .MuiSlider-rail': {
                  backgroundColor: '#EDEEF1',
                  height: 4,
                },
              }}
            />

            <div className={styles.inputs}>
              <div className={styles.inputСontainer}>
                <span className={styles.fixedText}>от</span>

                <input
                  type="number"
                  required
                  min={0}
                  // value={selected[0]}
                  value={
                    currentSettings.selected[0] < 0
                      ? 0
                      : currentSettings.selected[0]
                  }
                  onInput={(e) => {
                    if (e.target.value < 0) {
                      e.target.value = -e.target.value;
                    }
                  }}
                  onChange={(e) => {
                    // const newValue = [Number(e.target.value), selected[1]];
                    const newValue = [
                      Number(e.target.value),
                      currentSettings.selected[1],
                    ];

                    validate(e, newValue[0], newValue[1]);

                    dispatch(
                      setFilter({
                        key,
                        fild: 'selected',
                        value: newValue,
                      })
                    );
                    dispatch(setFilter({ key, fild: 'changed', value: true }));
                  }}
                  className={styles.inputField}
                />

                <span className={styles.fixedText}>{symbol}</span>
                {errors.minPrice && (
                  <div style={{ color: 'red', textAlign: 'center' }}>
                    {errors.minPrice}
                  </div>
                )}
              </div>

              <div className={styles.inputСontainer}>
                <span className={styles.fixedText}>до</span>

                <input
                  type="number"
                  required
                  // value={selected[1]}
                  value={currentSettings.selected[1]}
                  onInput={(e) => {
                    if (e.target.value < 0) {
                      e.target.value = -e.target.value;
                    }
                  }}
                  onChange={(e) => {
                    // const newValue = [selected[0], Number(e.target.value)];
                    const newValue = [
                      currentSettings.selected[0],
                      Number(e.target.value),
                    ];
                    validate(newValue[0], newValue[1]);

                    dispatch(
                      setFilter({
                        key,
                        fild: 'selected',
                        value: newValue,
                      })
                    );
                    dispatch(setFilter({ key, fild: 'changed', value: true }));
                  }}
                  className={styles.inputField}
                />

                <span className={styles.fixedText}>{symbol}</span>
                {errors.maxPrice && (
                  <div style={{ color: 'red', textAlign: 'center' }}>
                    {errors.maxPrice}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <ul className={styles.options}>
            {hasSearch && (
              <>
                <input
                  type="text"
                  placeholder="Поиск..."
                  className={styles.input}
                  value={filterState}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              </>
            )}

            {filteredOptions.map((option, index) => (
              <li
                className={selectedIndex === index ? styles.active : ''}
                key={index}
                onClick={() => handleSelectChange(option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
};

MultiFilter.propTypes = {
  settings: PropTypes.object,
};

export default React.memo(MultiFilter);
