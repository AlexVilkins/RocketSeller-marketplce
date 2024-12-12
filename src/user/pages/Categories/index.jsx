// import { deleteCategoty } from '@api/operator/useGoodsAPI';
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@components';
import { getGlobalCategories } from '@redux/globalCategories/asyncAction';
import {
  addWbCategory,
  getWbCategories,
} from '@redux/wbCategories/asyncAction';
import { setDeleteWbCategoty } from '@redux/wbCategories/slice';
import styles from './Categories.module.scss';

function Categories() {
  const [offset, setOffset] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const [search, setSearch] = useState('');
  const [alignment, setAlignment] = useState('all');
  const dispatch = useDispatch();
  const { addedCategories } = useSelector((state) => state.wbCategories);
  const { globalCategories } = useSelector((state) => state.globalCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(await getWbCategories());
    };
    const fetchCurrentCategories = async () => {
      dispatch(await getGlobalCategories({ limit: 50, offset: offset }));
    };
    fetchCategories();
    fetchCurrentCategories();
  }, []);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const filterCategories = (items) => {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const addCategories = async () => {
    // console.log(offset);
    setLoadData(true);
    const newOffset = offset + 50;
    dispatch(await getGlobalCategories({ limit: 50, offset: newOffset }));
    setOffset(newOffset);
    setLoadData(false);
  };

  const categoryIsNew = (category) => {
    return addedCategories.find((c) => c.path === category.path);
  };

  const addToCategories = (category) => {
    if (!categoryIsNew(category)) {
      dispatch(addWbCategory(category));
    } else {
      // deleteCategoty(category.id);
      dispatch(setDeleteWbCategoty(category.id));
    }
  };

  return (
    <>
      {globalCategories?.length == 0 ? (
        <CircularProgress
          size="80px"
          color="white"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        <>
          <div className={styles.header}>
            <input
              className={styles.input}
              type="text"
              placeholder="Поиск категорий..."
              value={search}
              onChange={handleInputChange}
            />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="all">Все</ToggleButton>
              <ToggleButton value="added">Добавленные</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className={styles.container}>
            {alignment === 'all'
              ? filterCategories(globalCategories).map((category, index) => (
                  <div
                    key={index}
                    className={`${styles.category} ${
                      categoryIsNew(category) ? styles.adding : ''
                    }`}
                    onClick={() => addToCategories(category)}
                  >
                    {category.name}
                  </div>
                ))
              : filterCategories(addedCategories).map((category, index) => (
                  <div
                    key={index}
                    className={`${styles.category} ${
                      categoryIsNew(category) ? styles.adding : ''
                    }`}
                    onClick={() => addToCategories(category)}
                  >
                    {category.name}
                  </div>
                ))}
          </div>
          {loadData ? (
            <CircularProgress
              color="white"
              sx={{ position: 'absolute', bottom: '-50%', left: '50%' }}
            ></CircularProgress>
          ) : (
            <Button
              title={'Добавить категории'}
              text={'Добавить'}
              onClick={addCategories}
            />
          )}
        </>
      )}
    </>
  );
}

export default Categories;
