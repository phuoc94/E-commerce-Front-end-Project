import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export interface AddProductRequest {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: AddProductRequest): Promise<Product> => {
    const response = await axios.post(API_URL, product);
    return response.data;
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (): Promise<Product[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId: string): Promise<Product> => {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  },
);
