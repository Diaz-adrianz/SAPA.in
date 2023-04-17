import express from 'express';
import { protect } from '../middlewares/auth.js';
import { Login, Logout, UserInfo } from './views.js';

const router = express.Router();

router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/userinfo', protect, UserInfo);

export default router;
