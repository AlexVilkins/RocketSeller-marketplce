import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addBasketItem,
  deleteBasketItem,
  getBasketItems,
  puyBasketItems,
} from '@user/api/basket';

export const getItems = createAsyncThunk(
  'basket/getBasketItems',
  async ({ limit, offset }) => {
    const response = await getBasketItems(limit, offset);

    return response;
  }
);

export const addItem = createAsyncThunk(
  'basket/addBasketItem',
  async (item) => {
    await addBasketItem(item.id);
    return item;
  }
);

export const delItem = createAsyncThunk(
  'basket/deleteBasketItem',
  async (items) => {
    await deleteBasketItem(items);
    return items;
  }
);

export const buyItem = createAsyncThunk(
  'basket/buyBasketItem',
  async (items) => {
    await puyBasketItems(items);
    return items;
  }
);

// export const buyItem = createAsyncThunk(
//   'basket/buyBasketItem',
//   async (items) => {
//     await getBasketItems(items);
//     return items;
//   }
// );
