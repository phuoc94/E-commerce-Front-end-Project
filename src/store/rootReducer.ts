import { combineReducers } from 'redux';

import authReducer from './reducers/auth.slice';
import categoryReducer from './reducers/category.slice';
import productReducer from './reducers/product.slice';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  auth: authReducer,
});

export default rootReducer;
