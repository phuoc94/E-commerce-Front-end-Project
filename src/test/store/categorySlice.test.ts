import {
  fetchCategories,
  fetchCategory,
} from '../../store/actions/category.actions';
import { fetchCategoryProducts } from '../../store/actions/product.actions';
import { createStore } from '../../store/configureStore';
import categoryData from '../data/categoryData';
import productsData from '../data/productsData';
import server from '../server/categoryServer';

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Test categorytReducer async actions', () => {
  test('should fetch all categories', async () => {
    await store.dispatch(fetchCategories());
    const state = store.getState();
    expect(state.categories.categories).toMatchObject(categoryData);
  });

  test('should fetch a single category', async () => {
    await store.dispatch(fetchCategory(categoryData[0].id));
    const state = store.getState();
    expect(state.categories.category).toMatchObject(categoryData[0]);
  });

  test('should get category products', async () => {
    const categoryId = categoryData[2].id;
    await store.dispatch(fetchCategoryProducts(categoryId));
    const state = store.getState();
    const categoryProducts = productsData.filter(
      (p) => p.category.id === categoryId,
    );
    expect(state.products.products).toMatchObject(categoryProducts);
  });
});
