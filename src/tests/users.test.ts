import { requestAgent } from '@/utils/testRequestAgent';

// users Api 测试
describe('Test the users api', () => {
  // 注册
  test('POST /register', async () => {
    const response = await requestAgent
      .post('/users/v1/register')
      .send({ username: 'test1', password: '123456' });
    expect(response.status).toBe(200);
  });

  // 登录
  test('POST /login', async () => {
    const response = await requestAgent
      .post('/users/v1/login')
      .send({ username: 'test1', password: '123456' });
    expect(response.status).toBe(200);
  });

  // 信息
  test('GET /info', async () => {
    const response = await requestAgent
      .get('/users/v1/info')
      .query({ username: 'test1', password: '123456' });
    expect(response.status).toBe(200);
  });
});
