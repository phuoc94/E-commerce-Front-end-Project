import { fetchCategories } from '../../store/actions/category.actions';
import { createStore } from '../../store/configureStore';
import categoryData from '../data/categoryDate';
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
});
