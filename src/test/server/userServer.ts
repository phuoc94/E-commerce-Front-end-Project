import { rest } from 'msw';
import { setupServer } from 'msw/node';

import usersData from '../data/usersData';

export const access_token = 'my-access-token';
export const refresh_token = 'my-refresh-token';

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
        return res(ctx.json({ access_token: token }));
      } else {
        return res(
          ctx.status(401),
          ctx.json({
            errorMessage: `Unauthorized`,
          }),
        );
      }
    },
  ),
  rest.post(
    'https://api.escuelajs.co/api/v1/auth/refresh-token',
    async (req, res, ctx) => {
      const { refreshToken } = await req.json();
      const userid = refreshToken.split('_')[1];
      const foundUser = usersData.find((u) => u.id === Number(userid));
      if (foundUser) {
        const token = access_token + '_' + foundUser.id;
        return res(ctx.json({ access_token: token }));
      } else {
        return res(
          ctx.status(401),
          ctx.json({
            errorMessage: `Unauthorized`,
          }),
        );
      }
    },
  ),
  rest.get(
    'https://api.escuelajs.co/api/v1/auth/profile',
    async (req, res, ctx) => {
      const authorization = req.headers.get('Authorization');
      const token = authorization?.split(' ')[1];
      const userid = token?.split('_')[1];
      const foundUser = usersData.find((u) => u.id === Number(userid));
      if (foundUser) {
        return res(ctx.json(foundUser));
      } else {
        return res(
          ctx.status(401),
          ctx.json({
            errorMessage: `Unauthorized`,
          }),
        );
      }
    },
  ),
];

const userServer = setupServer(...handlers);

export default userServer;
