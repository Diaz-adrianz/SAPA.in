import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import ConnDB from './db.js';
import urlsUsers from './Users/url.js';
import urlsAuth from './Auth/url.js';
import urlsRooms from './Rooms/url.js';
import urlsMsg from './Messages/url.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: process.env.WEB_CLIENT_URI }));
app.use(express.json());

ConnDB();

// ROUTES
app.use('/users', urlsUsers);
app.use('/auth', urlsAuth);
app.use('/rooms', urlsRooms);
app.use('/messages', urlsMsg);
app.use('*', (req, res) => res.status(404).json({ msg: 'API path not found' }));

app.listen(port, () => {
	console.log(`SAPA.in | listening on port ${port}`);
});
