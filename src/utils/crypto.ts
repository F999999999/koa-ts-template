import crypto from 'crypto';

export const cryptoPassword = (payload: string) => {
  return crypto
    .createHash('sha256')
    .update(payload + process.env.PASSWORD_SECRET_KEY)
    .digest('hex');
};
