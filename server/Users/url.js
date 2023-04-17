import express from 'express';
import { DetailUser, ListUser } from './views.js';
const router = express.Router();

router.get('/', ListUser);
router.get('/:key', DetailUser);

export default router;
