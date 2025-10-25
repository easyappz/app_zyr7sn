import instance from './axios';

export async function getBonusSummary() {
  const { data } = await instance.get('/api/bonus/summary');
  return data;
}
