import {
  fetchNewAccessToken,
  getProfile,
  login,
} from '../../store/actions/auth.actions';
import { createStore } from '../../store/configureStore';
import usersData from '../data/usersData';
import server, { access_token, refresh_token } from '../server/userServer';

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
    expect(store.getState().auth.accessToken).toBe(
      `${access_token}_${usersData[0].id}`,
    );
  });

  test("Shouldn't login user if wrong credentials", async () => {
    await store.dispatch(
      login({ email: 'john@mail.com', password: 'changemeaasd' }),
    );
    expect(store.getState().auth.error).toBe(
      'Request failed with status code 401',
    );
  });

  test('Should get a new access token with a refresh token', async () => {
    await store.dispatch(
      fetchNewAccessToken(`${refresh_token}_${usersData[0].id}`),
    );
    expect(store.getState().auth.accessToken).toBe(
      `${access_token}_${usersData[0].id}`,
    );
  });

  test("Shouldn't get a new access token with a wrong refresh token", async () => {
    await store.dispatch(fetchNewAccessToken(`${refresh_token}_wrong`));
    expect(store.getState().auth.error).toBe(
      'Request failed with status code 401',
    );
  });

  test('Should get the profile the current user with session', async () => {
    await store.dispatch(getProfile(`${access_token}_${usersData[1].id}`));
    expect(store.getState().auth.profile).toMatchObject(usersData[1]);
  });

  test("Shouldn't get the profile the current user with a wrong session", async () => {
    await store.dispatch(getProfile(`${access_token}_wrong`));
    expect(store.getState().auth.error).toBe(
      'Request failed with status code 401',
    );
  });
});
