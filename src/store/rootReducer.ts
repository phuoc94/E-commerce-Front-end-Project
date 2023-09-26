import { combineReducers } from 'redux';

import categoryReducer from '../features/category/category.slice';
import productReducer from '../features/products/product.slice';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
});

export default rootReducer;
