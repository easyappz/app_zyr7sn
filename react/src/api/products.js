import instance from './axios';

/**
 * Fetch products with optional filters.
 * Supports API query params exactly as backend schema (see server/src/api_schema.yaml):
 * - type: 'drink' | 'dessert'
 * - category: string (e.g. 'coffee')
 * - popular: boolean | 1 | 'true'
 * - page: number
 * - limit: number
 * - sort: 'price' | '-price' | 'name' | '-name' | 'createdAt' | '-createdAt'
 *
 * @param {Object} params
 * @param {string} [params.type]
 * @param {string} [params.category]
 * @param {boolean|number|string} [params.popular]
 * @param {number} [params.page]
 * @param {number} [params.limit]
 * @param {string} [params.sort]
 * @returns {Promise<any>}
 */
export async function getProducts(params = {}) {
  const { type, category, popular, page, limit, sort } = params;
  const query = {};

  if (type) query.type = type;
  if (category) query.category = category;

  if (typeof popular !== 'undefined') {
    // Backend accepts boolean or 1/"true"
    if (popular === true || popular === false) {
      query.popular = popular;
    } else if (popular === 1 || popular === '1') {
      query.popular = 1;
    } else if (popular === 'true') {
      query.popular = 'true';
    } else {
      query.popular = popular;
    }
  }

  if (page) query.page = page;
  if (limit) query.limit = limit;
  if (sort) query.sort = sort;

  const { data } = await instance.get('/api/products', { params: query });
  return data;
}

/**
 * Fetch product by id
 * @param {string} id
 * @returns {Promise<any>}
 */
export async function getProduct(id) {
  const { data } = await instance.get(`/api/products/${id}`);
  return data;
}
