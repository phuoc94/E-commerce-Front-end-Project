import {
  addProduct,
  fetchProduct,
  fetchProducts,
} from '../../store/actions/product.actions';
import { createStore } from '../../store/configureStore';
import productsData from '../data/productsData';
import server from '../server/productServer';

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Test productReducer async actions', () => {
  test('should fetch all products', async () => {
    await store.dispatch(fetchProducts());
    const state = store.getState();
    expect(state.products.products).toMatchObject(productsData);
  });

  test('should fetch single product by id', async () => {
    await store.dispatch(fetchProduct('26'));
    const state = store.getState();
    expect(state.products.product).toMatchObject(productsData[0]);
  });

  test('should not fetch single product by id', async () => {
    await store.dispatch(fetchProduct('100'));
    const state = store.getState();
    expect(state.products.error).toBe('Request failed with status code 404');
  });

  test('should add a product', async () => {
    const newProduct = {
      title: 'New Product',
      price: 100,
      description: 'New Product Description',
      categoryId: 1,
      images: ['https://i.imgur.com/uDpzwEk.jpeg'],
    };
    await store.dispatch(addProduct(newProduct));
    const state = store.getState();
    expect(state.products.product).toMatchObject(newProduct);
  });
});
