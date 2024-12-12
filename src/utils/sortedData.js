const sortedData = (products, key, direction) => {
  let sortableItems = [...products];
  if (key) {
    sortableItems.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  return sortableItems;
};

export default sortedData;
