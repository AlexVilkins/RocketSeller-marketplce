import { configureStore } from '@reduxjs/toolkit';
// import extendedProducts from '.././entities/productModel/productSlice';
import balance from './balance/slice';
import basket from './basket/slice';
import exception from './exceptions/slice';
import filter from './filter/slice';
import globalCategories from './globalCategories/slice';
import sessionListeners from './sessionListeners/slice';
import session from './sessionSlice/slice';
import wbCategories from './wbCategories/slice';
import wbProducts from './wbProducts/slice';
import wbProductsUser from './wbProductsUser/slice';
import wbStatus from './wbStatus/slice';

const store = configureStore({
  reducer: {
    wbProducts,
    wbCategories,
    globalCategories,
    wbStatus,
    // extendedProducts,
    filter,
    wbProductsUser,
    basket,
    session,
    sessionListeners,
    balance,
    exception,
  },
});

export default store;
