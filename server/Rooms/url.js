import express from 'express';
import { protect } from '../middlewares/auth.js';
import { IsRoomAuthor, RoomCheck } from '../middlewares/rooms.js';
import { BanUser, CreateRoom, KickMember, ListRoom, MyPrivateRoom, NewMember, RemoveRoom, UnBanUser } from './views.js';

const router = express.Router();

router.get('/', ListRoom);
router.get('/my', protect, MyPrivateRoom);

router.post('/:room_name', protect, CreateRoom);
router.delete('/:room_name', protect, RoomCheck, IsRoomAuthor, RemoveRoom);

router.get('/:room_name/add/:user', protect, RoomCheck, IsRoomAuthor, NewMember);
router.delete('/:room_name/add/:user', protect, RoomCheck, IsRoomAuthor, KickMember);

router.get('/:room_name/ban/:user', protect, RoomCheck, IsRoomAuthor, BanUser);
router.delete('/:room_name/ban/:user', protect, RoomCheck, IsRoomAuthor, UnBanUser);

export default router;
