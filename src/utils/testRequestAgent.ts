import supertest from 'supertest';
import { app } from '../../app';
import { createToken } from '@/utils/jwt';

export const requestAgent = new Proxy(supertest(app.callback()), {
  get:
    (target, name) =>
    (...args) =>
      target[name](...args).set({
        Authorization: `Bearer ${createToken(
          { id: 1, username: 'jest test token' },
          300
        )}`,
        Accept: 'application/json',
      }),
});
