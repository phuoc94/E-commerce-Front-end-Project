import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { PRODUCT_API_URL } from '../../utils/constants';
import productsData from '../data/productsData';

export const handlers = [
  // get all products
  rest.get(PRODUCT_API_URL, async (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),

  // get single product
  rest.get(`${PRODUCT_API_URL}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const foundProduct = productsData.find((p) => p.id === Number(id));
    if (foundProduct) {
      return res(ctx.json(foundProduct));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          errorMessage: `Product with id ${id} not found`,
        }),
      );
    }
  }),

  // add product
  rest.post(PRODUCT_API_URL, async (req, res, ctx) => {
    const product = await req.json();
    return res(ctx.json(product));
  }),
];

const productServer = setupServer(...handlers);

export default productServer;
