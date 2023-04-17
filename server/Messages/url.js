import express from 'express';
import { protect } from '../middlewares/auth.js';
import { RoomCheck } from '../middlewares/rooms.js';
import { ListMessages, RemoveMessage, WriteMessage } from './views.js';

const router = express.Router();

router.delete('/modif/:msg_id', protect, RemoveMessage);

router.get('/:room_name', protect, RoomCheck, ListMessages);

router.post('/:room_name', protect, RoomCheck, WriteMessage);

export default router;
