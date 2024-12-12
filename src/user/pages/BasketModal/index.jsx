import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { Pagination } from '@mui/material';
import { getBalance } from '@redux/balance/asyncAction';
import { setBalance } from '@redux/balance/slice';
import { buyItem, delItem, getItems } from '@redux/basket/asyncAction';
import PayModal from '@user/pages/PayModal';
import basketEmpty from '@widgets/assets/emptyIcons/basketEmpty.svg';
import Empty from '@widgets/Empty';

import React from 'react';
import styles from './Basket.module.scss';
import Table from './Table';

import { useNavigate } from 'react-router-dom';

// import { Pagination } from '@mui/material';
import { ProgressComponent } from '@shared/ui';
import ModalWindow from '@shared/ui/ModalWindow';

// Коммиты не удалять, раскомментировать при необходимости пагинации !!!

const BasketModal = ({
  isOpenModal,
  onBasketModal,
  basketItems,
  basketStatus,
  // basketTotal,
  // currentPage,
  // setCurrentPage,
}) => {
  const [payPrice, setPayPrice] = useState(0);
  const [payIsOpen, setPayIsOpen] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [extandItems, setExtandItems] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const balance = useSelector((state) => state.balance.balance);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const getBasItems = async () => {
      await dispatch(getItems({ limit: 10, offset: 0 }));
    };

    getBasItems();
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    setExtandItems(
      basketItems.map((item) => ({
        ...item,
        isChecked: false,
      }))
    );
  }, [basketItems]);

  const onPayBasket = async () => {
    const selectedItems = extandItems.filter((item) => item.isChecked);
    const offerIds = selectedItems.map((item) => item.id);

    if (offerIds.length > 0) {
      if (balance >= payPrice) {
        await dispatch(buyItem(offerIds));
        dispatch(setBalance(balance - payPrice));
        setPayPrice(0);
        setIsPay(true);
        await dispatch(getItems({ limit: 10, offset: 0 }));
      } else {
        setPayIsOpen(true);
        enqueueSnackbar('Недостаточно средств', {
          variant: 'info',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
      await dispatch(getBalance());
    } else {
      enqueueSnackbar('Выберите товары', {
        variant: 'info',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const handleSelectChange = (id) => {
    setExtandItems(
      extandItems.map((item) => {
        if (item.id === id) {
          setPayPrice(
            item.isChecked
              ? payPrice - Math.floor(item.offerPrice)
              : payPrice + Math.floor(item.offerPrice)
          );
          return {
            ...item,
            isChecked: !item.isChecked,
          };
        }
        return item;
      })
    );
  };

  const deleteItems = async () => {
    if (extandItems.filter((item) => item.isChecked).length > 0) {
      setPayPrice((price) => price - payPrice);
      await dispatch(delItem(extandItems.filter((item) => item.isChecked)));
      setExtandItems((prevItems) =>
        prevItems.filter((item) => !item.isChecked)
      ); // Удаляем только выбранные элементы из состояния

      await dispatch(getItems({ limit: 10, offset: 0 }));
    } else {
      enqueueSnackbar('Выберите товары', {
        variant: 'info',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    }
  };

  const handleCheckALL = () => {
    const val = !isAllChecked;
    setIsAllChecked(val);
    setExtandItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        isChecked: val,
      }))
    );

    if (val) {
      setPayPrice(
        extandItems.reduce((acc, item) => acc + Math.floor(item.offerPrice), 0)
      );
    } else {
      setPayPrice(0);
    }
  };

  const handleNavigateToBuy = () => {
    navigate('/user/buy');
  };

  return (
    <>
      <ModalWindow title="Корзина" onCloseModal={onBasketModal}>
        <div className={styles.body}>
          {basketStatus === 'error' && <p>Что-то пошло не так!</p>}
          {basketStatus === 'success' && basketItems.length === 0 && (
            <Empty
              icon={basketEmpty}
              text="Похоже, что ваша корзина пуста. Для оплаты и расчёта статистики перейдите к каталогу товаров и добавьте желаемые в список покупок"
              buttonText="Перейти к покупкам"
              buttonColor={'#8982FF'}
              onClick={() => onBasketModal(false)}
            />
          )}
          {basketStatus === 'success' && basketItems.length > 0 && (
            <Table
              items={extandItems}
              handleSelectChange={handleSelectChange}
              isAllChecked={isAllChecked}
              handleCheckALL={handleCheckALL}
            />
          )}
          {basketStatus === 'loading' && (
            <ProgressComponent title="Загрузка товаров" />
          )}
        </div>
        <div className={styles.footer}>
          {basketStatus === 'success' && basketItems.length !== 0 && (
            <>
              <div className={styles.price}>
                <div className={styles.balance}>
                  Баланс
                  <p>{balance} ₽</p>
                </div>
                <div
                  className={`${styles.allPrice} ${payPrice > 0 ? styles.hasPrice : ''}`}
                >
                  К оплате
                  <p>{payPrice} ₽</p>
                </div>
              </div>
              <button className={styles.deleteButton} onClick={deleteItems}>
                Удалить
              </button>
              <button className={styles.payButton} onClick={onPayBasket}>
                Оплатить
              </button>
            </>
          )}
        </div>
      </ModalWindow>
      {payIsOpen && <PayModal setPayIsOpen={setPayIsOpen} />}
      {isPay && (
        <ModalWindow onCloseModal={() => setIsPay(false)}>
          <button onClick={handleNavigateToBuy}>К покупкам</button>
          <> </>
        </ModalWindow>
      )}
    </>
  );
};

BasketModal.propTypes = {
  onBasketModal: PropTypes.func.isRequired,
};

export default React.memo(BasketModal);
