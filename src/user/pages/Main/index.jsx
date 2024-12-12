import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { addItem, delItem, getItems } from '@redux/basket/asyncAction';
import {
  getUserCategories,
  getUserFiltersRange,
} from '@redux/filter/asyncAction';

import { dropFilters } from '@redux/filter/slice';
import { getProducts } from '@redux/wbProductsUser/asyncAction';

import BasketModal from '../BasketModal';
import MultiFilter from './MultiFilter';

import basketIcon from '@assets/basket.svg';
import { ProgressComponent } from '@shared/ui';
import ProductsTable from '@user/pages/Main/Products';
import tableEmpty from '@widgets/assets/emptyIcons/tableEmpty.svg';
import Empty from '@widgets/Empty';
import styles from './Main.module.scss';

const Main = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { basketItems, basketTotal, basketStatus } = useSelector(
    (state) => state.basket
  );
  const { filtersList } = useSelector((state) => state.filter);
  const { items, total, status } = useSelector((state) => state.wbProductsUser);
  const [currentBasketPage, setCurrentBasketPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(await getUserCategories());
    };

    const getBasketItems = async () => {
      await dispatch(getItems({ limit: 6, offset: 0 }));
    };

    const getMainProducts = async () => {
      const filterval = filterVal();

      await dispatch(getProducts({ limit: 10, offset: 0, filterval }));
      setCurrentPage(1);
    };

    const getFiltersValues = async () => {
      // console.log(
      //   'sadad',
      //   !Object.values(filtersList)
      //     .map((item) => item.changed)
      //     .includes(true)
      // );
      if (
        !Object.values(filtersList)
          .map((item) => item.changed)
          .includes(true)
      ) {
        await dispatch(getUserFiltersRange());
      }
    };

    getMainProducts();
    getBasketItems();
    fetchCategories();
    getFiltersValues();
  }, []);

  useEffect(() => {
    if (status === 'error') {
      enqueueSnackbar('Произошла ошибка', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  }, [status]);

  const addToCart = async (item) => {
    if (basketTotal < 10) {
      await dispatch(addItem(item));
    } else {
      enqueueSnackbar('Лимит 10 товаров.', {
        variant: 'info',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const delFromCart = async (id) => {
    console.log('delFromCart', [id]);
    await dispatch(delItem([{ id }]));
  };

  const extendProducts = () => {
    return items.map((product) => {
      const isInCart = basketItems.some((filter) => filter.id === product.id);

      return {
        ...product,
        icon: getCategoryIcon(product.category),
        inCart: isInCart,
        isPurchase: false, // пока не понятно какая логика должна быть здесь и что мы меняем в зависимости от true/false
      };
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      одежда: '/src/assets/basket.svg',
      обувь: '/src/assets/basket.svg',
      белье: '/src/assets/basket.svg',
    };
    return icons[category] || null;
  };

  const handleStartChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndChange = (event) => {
    setEndDate(event.target.value);
  };

  const getProductsAPI = async () => {
    console.log(
      Object.keys(filtersList)
        .map((filter) => filtersList[filter].error)
        .includes(true)
    );
    if (
      Object.keys(filtersList)
        .map((filter) => filtersList[filter].error)
        .includes(true)
    ) {
      enqueueSnackbar('Некорректные данные фильтров', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    } else {
      const filterval = filterVal();

      await dispatch(getProducts({ limit: 10, offset: 0, filterval }));
      setCurrentPage(1);
    }
  };

  const paginateHandler = async (value) => {
    setCurrentPage(value);

    const filterval = filterVal();

    await dispatch(
      getProducts({ limit: 10, offset: value * 10 - 10, filterval })
    );
  };

  const filterVal = () => {
    let filterval = '';

    Object.keys(filtersList).map((key) => {
      if (typeof filtersList[key].selected === 'string') {
        filtersList[key].selected !== '' &&
          (filterval += `${key}=${filtersList[key].selected}`);
      } else {
        filterval += `&from${key}=${filtersList[key].selected[0] > 0 ? filtersList[key].selected[0] : 0}&to${key}=${filtersList[key].selected[1]}`;
      }
    });

    return filterval.startsWith('&') ? filterval.substring(1) : filterval;
  };

  const onBasketModal = (value) => {
    setIsOpenModal(value);
  };

  const handleDropFilters = () => {
    dispatch(dropFilters());
  };

  const extendedProducts = extendProducts();

  if (status === 'loading') {
    return;
  }

  return (
    <div className={styles.container}>
      <h3>Подбор товаров</h3>

      <button className={styles.basket} onClick={() => onBasketModal(true)}>
        <p>Перейти в корзину</p>
        <img src={basketIcon} alt="Open Basket" />

        <p className={styles.count}>{basketTotal}</p>
      </button>

      <div className={styles.header}>
        <div className={styles.filters}>
          {Object.keys(filtersList).map((key) => (
            <MultiFilter key={key} settings={{ key, ...filtersList[key] }} />
          ))}
        </div>
        <button onClick={getProductsAPI} className={styles.btnGetProd}>
          Подобрать товары
        </button>
      </div>

      {isOpenModal && (
        <BasketModal
          isOpenModal={isOpenModal}
          onBasketModal={onBasketModal}
          basketItems={basketItems}
          basketStatus={basketStatus}
          basketTotal={basketTotal}
          currentPage={currentBasketPage}
          setCurrentPage={setCurrentBasketPage}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            status === 'loading' ? (
              <ProgressComponent title="Идет поиск товаров" />
            ) : extendedProducts.length > 0 ? (
              <ProductsTable
                addToCartHandler={addToCart}
                products={extendedProducts}
                paginateHandler={paginateHandler}
                currentPage={currentPage}
                total={total}
                delFromCartHandler={(id) => delFromCart(id)}
                openBasekt={(val) => onBasketModal(val)}
              />
            ) : (
              <Empty
                icon={tableEmpty}
                title="По текущим фильтрам ничего не найдено"
                text="Примените более мягкие фильтры для дальнейшей работы"
                buttonText="Сбросить фильтры"
                onClick={handleDropFilters}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
