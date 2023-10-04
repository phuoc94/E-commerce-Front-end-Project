import { combineReducers } from 'redux';

import authReducer from './reducers/auth.slice';
import cardReducer from './reducers/card.slice';
import categoryReducer from './reducers/category.slice';
import productReducer from './reducers/product.slice';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  auth: authReducer,
  card: cardReducer,
});

export default rootReducer;
