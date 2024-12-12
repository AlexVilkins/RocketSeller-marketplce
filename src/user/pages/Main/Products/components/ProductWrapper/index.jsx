import Basket from '@user/assets/table/Basket.svg';
import Trash from '@user/assets/table/Trash.svg';
import wbIcon from '@user/assets/table/wbIcon.svg';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ProductWrapper.module.scss';

export const createProductWrapper = (
  item,
  addToCartHandler,
  delFromCartHandler,
  openBasekt
) => ({
  button: {
    // Действие
    component: () =>
      item.inCart ? (
        <div className={styles.isBuy}>
          <button onClick={() => delFromCartHandler(item.id)}>
            <img src={Trash} alt="trash" />
          </button>

          <button onClick={() => openBasekt(true)}>
            <img src={Basket} alt="basket" />
          </button>
        </div>
      ) : (
        <button
          className={styles.buttonBuy}
          onClick={() => addToCartHandler(item)}
        >
          Купить
        </button>
      ),

    align: 'center',
  },
  offerPrice: {
    // Цена
    component: () =>
      `${Math.floor(item.offerPrice)}\u00A0\₽` || <Skeleton height={40} />,
    align: 'center',
  },
  category: {
    // Категория
    component: () => (
      <div className={styles.categoryWrapper}>
        <>
          <img src={wbIcon} alt="icon" className={styles.categoryIcon} />
          <span>{item.category === '' ? 'Без категории' : item.category}</span>
        </>
      </div>
    ),
    align: 'left',
    style: {
      alignItems: 'flex-start',
      marginLeft: '10px',
    },
  },
  roi: {
    // ROI
    component: () =>
      (
        <div className={`${styles.valueWrapper} ${styles.positiveValue}`}>
          {`${item.roi}\u00A0%`}
        </div>
      ) || <Skeleton height={40} />,
    align: 'center',
  },
  performance: {
    // Performance
    component: () =>
      (
        <div className={styles.valueWrapper}>
          {`${item.performance}\u00A0%`}
        </div>
      ) || <Skeleton height={40} />,
    align: 'center',
  },
  turnoverPerMonth: {
    // Оборот в месяц
    component: () =>
      `${item.turnoverPerMonth}\u00A0\u20BD` || <Skeleton height={40} />,
    align: 'center',
  },
  marginPerMonth: {
    // Прибыль в месяц
    component: () =>
      `${item.marginPerMonth}\u00A0\u20BD` || <Skeleton height={40} />,
    align: 'center',
  },
  investments: {
    // Инвестиции на запуск
    component: () =>
      `${item.investments}\u00A0\u20BD` || <Skeleton height={40} />,
    align: 'center',
  },
  unitsToBuy: {
    // Количество на закупке
    component: () => `${item.unitsToBuy}\u00A0шт` || <Skeleton height={40} />,
    align: 'center',
  },
  entryPricePerUnit: {
    // Себестоимость
    component: () =>
      `${Math.floor(item.entryPricePerUnit)}\u00A0\u20BD` || (
        <Skeleton height={40} />
      ),
    align: 'center',
  },
  marginPerUnit: {
    // Маржа на ед
    component: () =>
      (
        <div
          className={styles.valueWrapper}
        >{`${Math.floor(item.marginPerUnit)}\u00A0\u20BD`}</div>
      ) || <Skeleton height={40} />,
    align: 'center',
    style: {
      color: '#2a2a2a',
    },
  },
});
