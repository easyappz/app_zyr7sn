import instance from './axios';

export async function sendOtp(phone) {
  const { data } = await instance.post('/api/auth/send-otp', { phone });
  return data;
}

export async function verifyOtp(phone, code) {
  const { data } = await instance.post('/api/auth/verify-otp', { phone, code });
  return data;
}

export async function me() {
  const { data } = await instance.get('/api/auth/me');
  return data;
}
