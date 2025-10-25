import instance from './axios';

export async function getPublicKey() {
  const { data } = await instance.get('/api/push/public-key');
  return data;
}

export async function subscribePush(subscription) {
  const { data } = await instance.post('/api/push/subscribe', { subscription });
  return data;
}
