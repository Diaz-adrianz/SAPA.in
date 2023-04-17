import ApiView from '../common/apiviews.js';
import ROOMS from '../Rooms/model.js';
import MESSAGES from './model.js';

export const WriteMessage = async (req, res) => {
	const Api = new ApiView(MESSAGES, {}, {}, ''),
		newMsg = await Api.exec(
			Api.create({
				...req.body,
				sender: req.user._id,
				room: req.room._id,
			})
		);

	const ApiRoom = new ApiView(ROOMS, { _id: req.room._id }, {}, ''),
		upRoom = await ApiRoom.exec(
			Api.update({
				last_message: req.body.text,
			})
		);

	return res.status(newMsg.status).json({ msg: newMsg.msg });
};

export const RemoveMessage = async (req, res) => {
	const Api = new ApiView(MESSAGES, { _id: req.params.msg_id, sender: req.user._id }),
		{ status, msg, data } = await Api.exec(Api.delete());

	return res.status(status).json(msg);
};

export const ListMessages = async (req, res) => {
	const Api = new ApiView(MESSAGES, { room: req.room._id, is_banned: false }, {}, '');
	Api.addPopulate('sender', '-email -first_name -last_name -role -createdAt -updatedAt -_id -is_banned -__v');

	const { status, msg, data } = await Api.exec(Api.list('', [], '', '', req.params.page));

	return res.status(status).json({ msg, data });
};
