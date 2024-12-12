import styles from './CheckBox.module.scss';

// Можно удалить нигде не используется, есть в shared

const CheckBox = ({ checked, onChange, children }) => {
  return (
    <label className={styles.customCheckbox}>
      <input
        type="checkbox"
        onChange={() => onChange(checked)}
        checked={checked}
      />
      <span className={styles.checkmark}></span>
      {children}
    </label>
  );
};

export default CheckBox;
