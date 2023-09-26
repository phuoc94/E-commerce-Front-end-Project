import store from '../../store/configureStore';
import { CategoryState, fetchCategories } from './category.slice';
import { Category } from './category.types';

describe('category reducer', () => {
  let initialState: CategoryState;
  let stateAfter: CategoryState;
  let mockProducts: Category[] = [
    {
      id: 1,
      name: 'category 1',
      image: 'image 1',
    },
    {
      id: 2,
      name: 'category 2',
      image: 'image 2',
    },
  ];

  beforeEach(async () => {
    await store.dispatch(fetchCategories.fulfilled(mockProducts, 'fulfilled'));
    initialState = store.getState().categories;
  });

  test('should have the initial state', () => {
    stateAfter = store.getState().categories;
    expect(initialState).toBe(stateAfter);
    expect(initialState.categories.length).toBeGreaterThanOrEqual(2);
  });
});
