import Router from 'koa-router';
import { register, login, Info } from '@/controller/users/v1';

const router = new Router({ prefix: '/users/v1' });
// 注册
router.post('/register', register);
// 登录
router.post('/login', login);
// 信息
router.get('/info', Info);

module.exports = router;
