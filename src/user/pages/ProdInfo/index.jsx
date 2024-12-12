import styles from './ProdInfo.module.scss';
import back from '../../assets/sidebar/back.png';
import { useLocation } from 'react-router-dom';

import { Field } from '../../../components';
// import { getInfoProductById } from "@api/operator/useChinaAPI";
// import avatar from "../../assets/ChinaBox.png";

function ProdInfo() {
  const location = useLocation();
  // const { id } = location.state;
  // const data = getInfoProductById(id);
  // TODO: Возможно переделать на redux, передавать через роутер данные не то?!
  const { data, sourse } = location.state;

  // console.log(data, sourse);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => window.history.back()}>
          <img src={back} alt="back" />
        </button>
        <p>Инофрмация о товаре</p>
      </div>
      <div className={styles.body}>
        <img src={sourse === 'wb' ? data.thumb : data.img} alt="Avatar" />
        <div className={styles.generalInfo}>
          <Field title="Артикул" text={data.id} />
          <Field
            title="Наименование"
            text={sourse === 'wb' ? data.name : data.title}
          />
          <Field
            // title="Категория"
            title={sourse === 'wb' ? 'Категория' : 'Компания'}
            text={sourse === 'wb' ? data.category : data.shopInfo.company_name}
          />
          <Field
            title="Описание"
            text={sourse === 'wb' ? data.subject : 'china'}
          />
          <Field title="Бренд" text={sourse === 'wb' ? data.brand : 'china'} />
          <Field title="Цвет" text={sourse === 'wb' ? data.color : 'china'} />
          <Field
            title="Рейтинг"
            text={sourse === 'wb' ? data.rating : 'china'}
          />
          <Field
            title="Кол-во отзывов"
            text={sourse === 'wb' ? data.comments : 'china'}
          />
        </div>
        <div className={`${styles.secondaryInfo} ${styles.generalInfo}`}>
          {/* <h5>Ключевые слова</h5>
          <div className={styles.keywords}>
            {keybords.map((keybord, index) => (
              <p key={index}>#{keybord}</p>
            ))}
          </div>

          <h5>Выручка</h5> */}
          <Field
            // title="Дата первого появления"
            title={sourse === 'wb' ? 'Дата первого появления' : 'Оптовая цена'}
            text={
              sourse === 'wb'
                ? data.skuFirstDate
                : data.priceInfo.wholesale_price
            }
          />
          <Field
            // title="Общее кол-во продаж"
            title={
              sourse === 'wb'
                ? 'Общее кол-во продаж'
                : 'Объем продаж за последние 30 дней'
            }
            text={sourse === 'wb' ? data.sales : data.saleInfo.gmv_30days}
          />
          <Field
            // title="Окончательная цена товара"
            title={
              sourse === 'wb'
                ? 'Окончательная цена товара'
                : 'Общее количество заказов'
            }
            text={
              sourse === 'wb' ? data.finalPrice : data.saleInfo.orders_count
            }
          />
          <Field
            // title="Cредний доход от продаж товара"
            title={
              sourse === 'wb'
                ? 'Cредний доход от продаж товара'
                : 'Сылка на магазин'
            }
            text={
              sourse === 'wb' ? data.revenueAverage : data.shopInfo.shop_url
            }
          />
          <Field
            // title="Cреднее количество продаж в день."
            title={
              sourse === 'wb'
                ? 'Cреднее количество продаж в день.'
                : 'Идентификатор участника.'
            }
            text={
              sourse === 'wb'
                ? data.salesPerDayAverage
                : data.shopInfo.member_id
            }
          />
          <Field
            // title="Cредний доход от продаж товара. "
            title={
              sourse === 'wb'
                ? 'Cредний доход от продаж товара. '
                : 'Год участия в TP. '
            }
            text={sourse === 'wb' ? data.revenueAverage : data.shopInfo.tp_year}
          />

          <Field
            // title="Окончательная цена товара."
            title={
              sourse === 'wb' ? 'Окончательная цена товара.' : 'Исходная цена. '
            }
            text={
              sourse === 'wb' ? data.finalPrice : data.priceInfo.origin_price
            }
          />
          <Field
            // title="Цена, по которой товар предлагается клиенту."
            title={
              sourse === 'wb'
                ? 'Цена, по которой товар предлагается клиенту.'
                : 'Цена для дропшиппинга'
            }
            text={
              sourse === 'wb'
                ? data.clientPrice
                : data.priceInfo.drop_ship_price
            }
          />
          <Field
            title="Ссылка на страницу товара. "
            text={sourse === 'wb' ? data.url : data.productUrl}
          />
        </div>
      </div>
    </div>
  );
}

export default ProdInfo;
