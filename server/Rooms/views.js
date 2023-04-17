import ROOMS from './model.js';
import ApiView from '../common/apiviews.js';

export const ListRoom = async (req, res) => {
	const apiview = new ApiView(ROOMS, { is_private: false }, req.query, ''),
		exec = await apiview.exec(apiview.list(req.query.search, ['name'], req.query.start, req.query.end, req.query.page));

	return res.status(exec.status).json(exec);
};

export const MyPrivateRoom = async (req, res) => {
	const Api = new ApiView(ROOMS, {
			$or: [{ author: req.user._id }, { members: { $in: [req.user._id] } }],
			is_private: true,
		}),
		{ status, msg, data } = Api.exec(
			Api.list(req.query.search, ['name'], req.params.start, req.params.end, req.params.page)
		);

	return res.status(status).json({ msg, data });
};

export const CreateRoom = async (req, res) => {
	const Api = new ApiView(ROOMS, {}, {}, ''),
		{ status, msg, data } = await Api.exec(
			Api.create({
				name: req.params.room_name,
				author: req.user._id,
				members: [req.user._id],
				last_message: req.body.text,
				is_private: req.body.is_private,
			})
		);

	return res.status(status).json(msg);
};

export const RemoveRoom = async (req, res) => {
	const Api = new ApiView(ROOMS, { _id: req.room._id }),
		{ status, msg, data } = await Api.exec(Api.delete());

	return res.status(status).json(msg);
};

export const NewMember = async (req, res) => {
	if (req.room.author == req.params.user) return res.status(400).json({ msg: 'It is an author' });

	const Api = new ApiView(ROOMS, { _id: req.room._id }, {}, ''),
		{ status, msg, data } = await Api.exec(Api.update({ $addToSet: { members: req.params.user } }));

	return res.status(status).json({ msg: status == 200 ? 'New member added' : msg });
};

export const KickMember = async (req, res) => {
	if (req.room.author == req.params.user) return res.status(400).json({ msg: 'It is an author' });

	const Api = new ApiView(ROOMS, { _id: req.room._id }, {}, ''),
		{ status, msg, data } = await Api.exec(Api.update({ $pull: { members: req.params.user } }));

	return res.status(status).json({ msg: status == 200 ? 'Member removed' : msg });
};

export const BanUser = async (req, res) => {
	if (req.room.author == req.params.user) return res.status(400).json({ msg: 'It is an author' });

	const Api = new ApiView(ROOMS, { _id: req.room._id }, {}, ''),
		{ status, msg, data } = await Api.exec(Api.update({ $addToSet: { banneds: req.params.user } }));

	return res.status(status).json({ msg: status == 200 ? 'User has been banned' : msg });
};

export const UnBanUser = async (req, res) => {
	if (req.room.author == req.params.user) return res.status(400).json({ msg: 'It is an author' });

	const Api = new ApiView(ROOMS, { _id: req.room._id }, {}, ''),
		{ status, msg, data } = await Api.exec(Api.update({ $pull: { members: req.params.user } }));

	return res.status(status).json({ msg: status == 200 ? 'User removed from banned list' : msg });
};
