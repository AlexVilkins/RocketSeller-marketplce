import { Tooltip } from '@mui/material';

import styles from './Item.module.scss';
import downloadIcon from '@assets/table/download.png';
import wbIcon from '@user/assets/table/wbIcon.svg';
import { getPDF } from '@user/api/table';

const Item = ({ item }) => {
  const { id, category, marginPerMonth, roi, investments, unitsToBuy, price } =
    item;

  const dowloadPdf = async () => {
    const pdfUrl = await getPDF(id);
    console.log(pdfUrl);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${category}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <tr className={styles.item}>
      <td>
        <label>
          <img src={wbIcon} alt="icon of product" />
          <p>{category}</p>
        </label>
      </td>
      <td>{marginPerMonth} ₽</td>
      <td className={roi > 0 ? styles.positive : styles.negative}>{roi} %</td>
      <td>
        <p className={styles.status}>Оплачен</p>
      </td>
      <td>{investments} ₽</td>
      <td>{unitsToBuy} шт</td>
      <td>{price} ₽</td>
      <td>
        <Tooltip title="Скачать PDF">
          <img
            className={styles.dowloadPdf}
            src={downloadIcon}
            alt="download pdf"
            onClick={dowloadPdf}
          />
        </Tooltip>
      </td>
    </tr>
  );
};

export default Item;
