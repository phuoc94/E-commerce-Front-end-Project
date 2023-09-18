import { combineReducers } from 'redux';

import productReducer from '../features/products/product.slice';

const rootReducer = combineReducers({
  product: productReducer,
});

export default rootReducer;