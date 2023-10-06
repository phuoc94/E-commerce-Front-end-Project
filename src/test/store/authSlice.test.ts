import { login } from '../../store/actions/auth.actions';
import { createStore } from '../../store/configureStore';
import server, { access_token } from '../server/userServer';

let store = createStore();

beforeEach(() => {
  store = createStore();
});

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Test authReducer async actions', () => {
  test('Should login user with right credential', async () => {
    await store.dispatch(
      login({ email: 'john@mail.com', password: 'changeme' }),
    );
    expect(store.getState().auth.accessToken).toBe(access_token + '_1');
  });
});
