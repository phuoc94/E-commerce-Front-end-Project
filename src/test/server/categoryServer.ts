import { rest } from 'msw';
import { setupServer } from 'msw/node';

import categoryData from '../data/categoryDate';

const CATEGORY_API_URL = 'https://api.escuelajs.co/api/v1/categories';

export const handlers = [
  // get all categories
  rest.get(CATEGORY_API_URL, async (req, res, ctx) => {
    return res(ctx.json(categoryData));
  }),
];

const categoryServer = setupServer(...handlers);

export default categoryServer;
