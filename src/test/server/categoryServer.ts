import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { CATEGORY_API_URL } from '../../utils/constants';
import categoryData from '../data/categoryData';
import productsData from '../data/productsData';

export const handlers = [
  // get all categories
  rest.get(CATEGORY_API_URL, async (req, res, ctx) => {
    return res(ctx.json(categoryData));
  }),

  // get single category
  rest.get(`${CATEGORY_API_URL}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const foundCategory = categoryData.find((c) => c.id === Number(id));
    if (foundCategory) {
      return res(ctx.json(foundCategory));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: `Category with id ${id} not found`,
        }),
      );
    }
  }),

  // get category products
  rest.get(`${CATEGORY_API_URL}/:id/products`, async (req, res, ctx) => {
    const { id } = req.params;
    const foundCategory = categoryData.find((c) => c.id === Number(id));
    const categoryProducts = productsData.filter(
      (p) => p.category.id === Number(id),
    );
    if (foundCategory) {
      return res(ctx.json(categoryProducts));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: `Category with id ${id} not found`,
        }),
      );
    }
  }),
];

const categoryServer = setupServer(...handlers);

export default categoryServer;
