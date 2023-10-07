import cartReducer, {
  addItemToCart,
  CartState,
  decreaseItemQuantity,
  increaseItemQuantity,
  Item,
  removeItemFromCart,
  setItemQuantity,
} from '../../store/reducers/cart.slice';
import productsData from '../data/productsData';

describe('cart reducer', () => {
  const initialState: CartState = {
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,
    error: null,
  };

  test('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle addItemToCart', () => {
    const product = productsData[0];
    const nextState = cartReducer(initialState, addItemToCart({ product }));
    expect(nextState.cartItems).toHaveLength(1);
    expect(nextState.cartItems[0]).toEqual({ ...product, quantity: 1 });
    expect(nextState.totalItems).toEqual(1);
    expect(nextState.totalPrice).toEqual(productsData[0].price);
  });

  test('should increaseItemQuantity if item already in cart', () => {
    const product = productsData[0];
    const item: Item = { ...productsData[0], quantity: 1 };
    const state = {
      ...initialState,
      cartItems: [item],
      totalItems: 1,
      totalPrice: item.price,
    };
    const nextState = cartReducer(state, addItemToCart({ product }));
    expect(nextState.cartItems).toHaveLength(1);
    expect(nextState.cartItems[0]).toEqual({ ...product, quantity: 2 });
    expect(nextState.totalItems).toEqual(2);
    expect(nextState.totalPrice).toEqual(productsData[0].price * 2);
  });

  test('should handle removeItemFromCart', () => {
    const product = productsData[0];
    const item: Item = { ...product, quantity: 2 };
    const state = {
      ...initialState,
      cartItems: [item],
      totalItems: 2,
      totalPrice: item.price * 2,
    };
    const nextState = cartReducer(state, removeItemFromCart(item));
    expect(nextState.cartItems).toHaveLength(0);
    expect(nextState.totalItems).toEqual(0);
    expect(nextState.totalPrice).toEqual(0);
  });

  test('should handle removeItemFromCart not in cart', () => {
    const product = productsData[0];
    const item: Item = { ...product, quantity: 2 };
    const state = {
      ...initialState,
      cartItems: [item],
      totalItems: 2,
      totalPrice: item.price * 2,
    };
    const nextState = cartReducer(state, removeItemFromCart(productsData[1]));
    expect(nextState.cartItems).toHaveLength(1);
    expect(nextState.totalItems).toEqual(2);
    expect(nextState.totalPrice).toEqual(productsData[0].price * 2);
  });

  test('should handle increaseItemQuantity', () => {
    const item: Item = { ...productsData[0], quantity: 1 };
    const state: CartState = {
      ...initialState,
      cartItems: [item],
      totalItems: 1,
      totalPrice: item.price,
    };
    const nextState = cartReducer(state, increaseItemQuantity({ id: 26 }));
    expect(nextState.cartItems[0].quantity).toEqual(2);
    expect(nextState.totalItems).toEqual(2);
    expect(nextState.totalPrice).toEqual(productsData[0].price * 2);
  });

  test('should handle increaseItemQuantity not in cart', () => {
    const item: Item = { ...productsData[0], quantity: 1 };
    const state: CartState = {
      ...initialState,
      cartItems: [item],
      totalItems: 1,
      totalPrice: item.price,
    };
    const nextState = cartReducer(state, increaseItemQuantity({ id: 27 }));
    expect(nextState.cartItems[0].quantity).toEqual(1);
    expect(nextState.totalItems).toEqual(1);
    expect(nextState.totalPrice).toEqual(productsData[0].price);
  });

  test('should handle decreaseItemQuantity', () => {
    const item = { ...productsData[0], quantity: 2 };
    const state = {
      ...initialState,
      cartItems: [item],
      totalItems: 2,
      totalPrice: item.price * 2,
    };
    const nextState = cartReducer(state, decreaseItemQuantity({ id: 26 }));
    expect(nextState.cartItems[0].quantity).toEqual(1);
    expect(nextState.totalItems).toEqual(1);
    expect(nextState.totalPrice).toEqual(productsData[0].price);
  });

  test('should handle decreaseItemQuantity not in cart', () => {
    const item = { ...productsData[0], quantity: 2 };
    const state = {
      ...initialState,
      cartItems: [item],
      totalItems: 2,
      totalPrice: item.price * 2,
    };
    const nextState = cartReducer(state, decreaseItemQuantity({ id: 27 }));
    expect(nextState.cartItems[0].quantity).toEqual(2);
    expect(nextState.totalItems).toEqual(2);
    expect(nextState.totalPrice).toEqual(productsData[0].price * 2);
  });

  test('should handle setItemQuantity', () => {
    const item = { ...productsData[0], quantity: 2 };
    const state = {
      ...initialState,
      cartItems: [item],
      totalItems: 2,
      totalPrice: item.price * 2,
    };
    const nextState = cartReducer(
      state,
      setItemQuantity({ id: 26, quantity: 3 }),
    );
    expect(nextState.cartItems[0].quantity).toEqual(3);
    expect(nextState.totalItems).toEqual(3);
    expect(nextState.totalPrice).toEqual(productsData[0].price * 3);
  });

  test('should handle setItemQuantity not in cart', () => {
    const item = { ...productsData[0], quantity: 2 };
    const state = {
      ...initialState,
      cartItems: [item],
      totalItems: 2,
      totalPrice: item.price * 2,
    };
    const nextState = cartReducer(
      state,
      setItemQuantity({ id: 27, quantity: 3 }),
    );
    expect(nextState.cartItems[0].quantity).toEqual(2);
    expect(nextState.totalItems).toEqual(2);
    expect(nextState.totalPrice).toEqual(productsData[0].price * 2);
  });
});
