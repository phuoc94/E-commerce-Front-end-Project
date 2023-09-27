import { combineReducers } from 'redux';

import authReducer from '../features/auth/auth.slice';
import categoryReducer from '../features/category/category.slice';
import productReducer from '../features/products/product.slice';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  auth: authReducer,
});

export default rootReducer;
