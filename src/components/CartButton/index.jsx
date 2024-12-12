import PropTypes from 'prop-types';

import styles from './CartButton.module.scss';

const CartButton = ({ text, onClick, inCart, isPurchase }) => {
  return (
    <button
      className={`${styles.cartButton} ${
        inCart ? styles.isInCart : styles.addToCart
      } `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CartButton;

CartButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  inCart: PropTypes.bool,
  isPurchase: PropTypes.bool,
};
