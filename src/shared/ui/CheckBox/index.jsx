import styles from './CheckBox.module.scss';

const CheckBox = ({ checked, onChange, children }) => {
  return (
    <label className={styles.customCheckbox}>
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className={styles.checkmark}></span>
      <div>{children}</div>
    </label>
  );
};

export default CheckBox;
