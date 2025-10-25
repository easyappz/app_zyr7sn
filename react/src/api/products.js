import instance from './axios';

export async function getProducts(params = {}) {
  const { type, page, limit, sort } = params;
  const query = {};
  if (type) query.type = type;
  if (page) query.page = page;
  if (limit) query.limit = limit;
  if (sort) query.sort = sort;
  const { data } = await instance.get('/api/products', { params: query });
  return data;
}

export async function getProduct(id) {
  const { data } = await instance.get(`/api/products/${id}`);
  return data;
}
