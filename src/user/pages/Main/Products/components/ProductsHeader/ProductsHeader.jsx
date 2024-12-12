// шапка таблицы продуктов для пользователя

import { useRef, useState } from 'react';

import { TableCell, TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

import headerInfo from '@user/assets/table/headerInfo.svg';
import styles from './ProductsHeader.module.scss';

const headerContent = [
  {
    key: 'action',
    name: 'Действие',
    sortable: false,
    direction: 'asc',
    icon: true,
    tooltipText:
      'Для уточнения информации о значении параметра наведите курсор на заголовок столбца.',
  },
  {
    key: 'price',
    name: 'Цена',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText: 'Цена для покупки инфорнмации о товаре.',
  },
  {
    key: 'category',
    name: 'Категория',
    sortable: true,
    direction: 'asc',
    icon: false,
    tooltipText: 'Категория товаров на площадках маркетплейсов.',
  },
  {
    key: 'roi',
    name: 'ROI',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText:
      'Процентное соотношение между прибылью и инвестициями. Показывает коэффициент возврата вложений за год.',
  },
  {
    key: 'performance',
    name: 'Performance',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText:
      'Рост капитала с продажи одной партии. ROI на инвестиции в закупку.',
  },
  {
    key: 'turnoverPerMonth',
    name: 'Оборот в месяц, руб.',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText:
      'Оборот средств в месяц с продажи товаров до вычета всех расходов.',
  },
  {
    key: 'profitPerMonth',
    name: 'Прибыль в месяц, руб.',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText:
      'Выручка с проданного товара за вычетом расходов (закупка, упаковка, доставка, расходы маркетплейса, реклама и налог 2%).',
  },
  {
    key: 'investments',
    name: 'Инвестиции на запуск, руб.',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText:
      'Необходимая сумма средств на закупку первой партии товара с учетом затрат и продвижения на маркетплейсах.',
  },
  {
    key: 'unitsToBuy',
    name: 'Количество к закупке, шт.',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText: `Общее количество закупаемого товара для первой поставки. Для товаров с размерным рядом, важно, самостоятельно проверить процентное соотношение продаж каждого размера и расписать количество товара в закуп по размерам на основании общего количества.`,
  },
  {
    key: 'purchaseCny',
    name: 'Себестоимость, руб.',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText:
      'Закупочная цена на единицу товара + доставка до склада в Москве.',
  },
  {
    key: 'marginPerMonth',
    name: 'Маржа на ед., руб.',
    sortable: false,
    direction: 'asc',
    icon: false,
    tooltipText:
      'Прибыль на одну проданную единицу товара за вычетом всех расходов (закупка, упаковка, доставка, расходы маркетплейса, реклама и налог 2%).',
  },
];

const ProductsHeader = ({ changeDirection }) => {
  const [headers, setHeaders] = useState(headerContent);
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const tooltipRef = useRef(null); // Создаем ref для тултипа
  const [tooltipStyle, setTooltipStyle] = useState({});

  const handleMouseEnter = (key, event) => {
    setTooltipVisible(key);
    const tooltipWidth = tooltipRef.current
      ? tooltipRef.current.offsetWidth
      : 0;
    const cellRect = event.currentTarget.getBoundingClientRect();
    const spaceOnRight = window.innerWidth - cellRect.right - 300; // Расстояние до правого края окна

    // Если тултип не помещается, устанавливаем стиль
    if (spaceOnRight < tooltipWidth) {
      setTooltipStyle({
        position: 'absolute',
        top: '50px',
        right: '0',
      });
    } else {
      setTooltipStyle({
        position: 'absolute',
        top: '50px',
        left: 0,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipVisible(null);
  };

  const getNewDirection = (headItem) => {
    let direction = 'asc';

    if (headItem.direction === 'asc') {
      direction = 'desc';
    } else direction = 'asc';

    return direction;
  };

  const requestSort = (headItem) => {
    if (!headItem.sortable) {
      return;
    }

    let direction = getNewDirection(headItem);

    const updatedHeaders = headers.map((item) =>
      item.key === headItem.key ? { ...item, direction } : item
    );

    setHeaders(updatedHeaders);
    changeDirection(headItem.key, direction);
  };

  return (
    <TableHead>
      <TableRow className={styles.productsHead}>
        {headers.map((headItem) => {
          return (
            <TableCell
              key={headItem.key}
              align="center"
              sx={{ ...(headItem.sortable && { cursor: 'pointer' }) }}
              onClick={() => requestSort(headItem)}
              onMouseEnter={(event) => handleMouseEnter(headItem.key, event)} // Передаем событие
              onMouseLeave={handleMouseLeave}
              className={styles.productsHeadCell}
              style={headItem.style || {}}
            >
              <div className={styles.productsHeadCellName}>
                {headItem.name}
                {headItem.icon && <img src={headerInfo} alt="info" />}
                {tooltipVisible === headItem.key && (
                  <div
                    ref={tooltipRef}
                    className={styles.tooltip}
                    style={tooltipStyle}
                  >
                    {headItem.tooltipText}
                  </div>
                )}
              </div>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

ProductsHeader.propTypes = {
  changeDirection: PropTypes.func,
};

export default ProductsHeader;
