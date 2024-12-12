import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = ({ product }) => {
  const { category, marginPerMonth, unitsToBuy, inCart } = product;

  return (
    //Теперь обработанные данные можно универсально передавать в компонент с любой разметкой
    <article className={`${styles.animation} ${styles.card}`}>
      <p>{category}</p>
      <p>{marginPerMonth}</p>
      <p>{unitsToBuy}</p>
      <button>{inCart ? 'Убрать из корзины' : 'Добавить в корзину'}</button>
    </article>
  );
};

Card.propTypes = {
  product: PropTypes.any, //TODO: добавить верный тип
};

export default Card;

// старое наполнение, возможно понадобится для демонстрации
// return (
//   <article className={`${styles.animation} ${styles.card}`}>
//     <img
//       src={imageUrl || 'нет картинки(('}
//       className={styles.picture}
//       alt={category}
//     />
//     <div className={styles.info}>
//       <p className={styles.category}>{category || 'Категория'}</p>
//       <div className={styles.descriptionWrapper}>
//         <p className={`${styles.description} ${styles.costText}`}>
//           Себестоимость
//         </p>
//         <p className={`${styles.cost} ${styles.costValue}`}>
//           {cost ? `${cost} р.` : 'Себестоимость'}
//         </p>
//         <p className={`${styles.description} ${styles.profitText}`}>
//           Выручка
//         </p>
//         <p className={`${styles.profit} ${styles.profitValue}`}>
//           {profit ? `${profit} р.` : '000000 р.'}
//         </p>
//         <p className={`${styles.description} ${styles.timeText}`}>за 7 д.</p>
//       </div>
//     </div>
//     <Button text="Добавить"></Button>
//   </article>
// );
