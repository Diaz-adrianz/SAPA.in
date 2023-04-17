import axios from 'axios';
import jwt from 'jsonwebtoken';

import USERS from './model.js';
import { handleErrors, randomStr } from '../common/helpers.js';

export const Login = async (req, res) => {
	const { googleToken } = req.body;

	if (!googleToken) {
		return res.status(400).json({
			status: 'warning',
			msg: 'Something wrong with google auth',
		});
	}

	try {
		const gUser = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
			headers: {
				Authorization: `Bearer ${googleToken}`,
			},
		});

		const { given_name, family_name, email, picture } = gUser.data;

		const existUser = await USERS.findOne({ email });

		let uId, action;

		if (!existUser) {
			const createUser = await USERS.create({
				first_name: given_name,
				last_name: family_name,
				email,
				profile_picture: picture,
				nickname: given_name.trim() + randomStr(4),
			});

			uId = createUser._id;
			action = 'Sign up';
		} else {
			(uId = existUser._id), (action = 'Sign in');
		}

		const token = jwt.sign(
			{
				_id: uId,
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '30d',
			}
		);

		res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

		res.status(200).json({
			msg: action + ' with google success',
			data: token,
		});
	} catch (error) {
		let err = handleErrors(error);

		res.status(err.status).json({
			msg: err.msg,
		});
	}
};

export const Logout = async (req, res) => {
	res.clearCookie('token');

	res.status(200).json({
		msg: 'Logout success',
	});
};

export const UserInfo = async (req, res) => {
	try {
		const user = await USERS.findById(req.user._id);

		if (!user) throw { name: 'NotFound', lookup: 'User' };

		res.status(200).json({
			msg: 'User info',
			data: user,
		});
	} catch (error) {
		let err = handleErrors(error);

		res.status(err.status).json({
			msg: err.msg,
		});
	}
};
