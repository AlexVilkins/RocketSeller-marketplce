export const currentDateFormat = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
};

export const formateTime = (date) => {
  if (date) {
    const dateObject = new Date(date);
    return dateObject.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    return '';
  }
};

export const formateDate = (date) => {
  if (date) {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString('ru-RU');
  } else {
    return '';
  }
};
