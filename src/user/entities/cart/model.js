const keysList = ['id', 'name', 'description', 'price', 'imageUrl'];

const product = Object.fromEntries(keysList.map((key) => [key, typeof key]));

const cartModel = {
  product: product,
  price: 'number',
};
