import { rest } from 'msw';
import { setupServer } from 'msw/node';

import usersData from '../data/usersData';

export const access_token = 'my-access-token';

export const handlers = [
  rest.post(
    'https://api.escuelajs.co/api/v1/auth/login',
    async (req, res, ctx) => {
      const { email, password } = await req.json();
      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password,
      );
      if (foundUser) {
        const token = access_token + '_' + foundUser.id;
        console.log('token', token);
        return res(ctx.json({ access_token: token }));
      } else {
        ctx.status(401);
        return res(ctx.text('Cannot authenticate user'));
      }
    },
  ),
];

const userServer = setupServer(...handlers);

export default userServer;
